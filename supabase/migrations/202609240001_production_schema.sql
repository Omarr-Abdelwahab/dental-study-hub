-- Denta Help production schema. Apply once with the Supabase CLI or SQL editor.
create extension if not exists pgcrypto;

create type public.app_role as enum ('student', 'admin');
create type public.purchase_status as enum ('pending', 'approved', 'rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null check (char_length(email) between 3 and 320),
  full_name text not null check (char_length(full_name) between 2 and 120),
  phone text not null default '' check (char_length(phone) <= 40),
  university text not null default '' check (char_length(university) <= 160),
  academic_year text not null default '' check (char_length(academic_year) <= 80),
  role public.app_role not null default 'student',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Full payload is administrator-only and contains answer keys and protected resource locations.
create table public.courses (
  id text primary key check (char_length(id) between 1 and 100),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  updated_at timestamptz not null default now()
);

-- Enrolled students receive this answer-key-free payload while access is active.
create table public.student_courses (
  id text primary key,
  slug text not null unique,
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  updated_at timestamptz not null default now()
);

-- Public payload never contains paid media, files, answer keys, or explanations.
create table public.course_catalog (
  id text primary key,
  slug text not null unique,
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  updated_at timestamptz not null default now()
);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id text not null references public.course_catalog(id) on delete restrict,
  enrolled_at timestamptz not null default now(),
  source text not null check (source in ('purchase', 'granted')),
  revoked boolean not null default false,
  unique (user_id, course_id)
);

create table public.lesson_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id text not null references public.course_catalog(id) on delete restrict,
  lesson_id text not null check (char_length(lesson_id) between 1 and 100),
  last_position_sec integer not null default 0 check (last_position_sec between 0 and 86400),
  watched_sec integer not null default 0 check (watched_sec between 0 and 10000000),
  percent integer not null default 0 check (percent between 0 and 100),
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id text not null references public.course_catalog(id) on delete restrict,
  lesson_id text not null,
  score integer not null check (score between 0 and 100),
  passed boolean not null,
  answers jsonb not null check (jsonb_typeof(answers) = 'array'),
  taken_at timestamptz not null default now()
);

create table public.bookmarks (
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id text not null references public.course_catalog(id) on delete cascade,
  lesson_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table public.purchase_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id text not null references public.course_catalog(id) on delete restrict,
  amount numeric(10,2) not null check (amount > 0),
  transfer_reference text not null check (char_length(trim(transfer_reference)) between 4 and 100),
  status public.purchase_status not null default 'pending',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles(id),
  rejection_reason text check (rejection_reason is null or char_length(rejection_reason) <= 500)
);

create table public.announcements (
  id text primary key,
  course_id text references public.course_catalog(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  body text not null check (char_length(body) between 1 and 5000),
  created_at timestamptz not null default now()
);

create table public.activity_days (
  user_id uuid not null references public.profiles(id) on delete cascade,
  activity_date date not null,
  primary key (user_id, activity_date)
);

create table public.daily_watch_time (
  user_id uuid not null references public.profiles(id) on delete cascade,
  activity_date date not null,
  watched_sec integer not null default 0 check (watched_sec between 0 and 86400),
  primary key (user_id, activity_date)
);

create index idx_enrollments_user_active on public.enrollments(user_id, revoked);
create index idx_progress_user_updated on public.lesson_progress(user_id, updated_at desc);
create index idx_attempts_user_lesson on public.quiz_attempts(user_id, lesson_id, taken_at desc);
create index idx_purchase_status_created on public.purchase_requests(status, created_at desc);
create unique index idx_purchase_one_open_per_course on public.purchase_requests(user_id, course_id)
where status in ('pending', 'approved');
create unique index idx_purchase_transfer_reference on public.purchase_requests(lower(trim(transfer_reference)));
create index idx_announcements_course_created on public.announcements(course_id, created_at desc);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  )
$$;

create or replace function public.has_active_course_access(p_course_id text)
returns boolean language sql stable security definer set search_path = ''
as $$
  select public.is_admin() or exists (
    select 1
    from public.enrollments e
    join public.course_catalog c on c.id = e.course_id
    where e.user_id = auth.uid()
      and e.course_id = p_course_id
      and e.revoked = false
      and now() >= coalesce((c.payload->>'accessOpenAt')::timestamptz, '-infinity'::timestamptz)
      and now() <= coalesce((c.payload->>'accessCloseAt')::timestamptz, 'infinity'::timestamptz)
  )
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, phone, university, academic_year)
  values (
    new.id,
    left(coalesce(new.email, ''), 320),
    left(coalesce(nullif(trim(new.raw_user_meta_data->>'full_name'), ''), 'Student'), 120),
    left(coalesce(trim(new.raw_user_meta_data->>'phone'), ''), 40),
    left(coalesce(trim(new.raw_user_meta_data->>'university'), ''), 160),
    left(coalesce(trim(new.raw_user_meta_data->>'academic_year'), ''), 80)
  );
  return new;
end
$$;

create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end
$$;

create trigger profiles_touch_updated_at before update on public.profiles
for each row execute procedure public.touch_updated_at();

create or replace function public.set_purchase_request_fields()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare v_expected_amount numeric(10,2);
begin
  if new.transfer_reference is null or char_length(trim(new.transfer_reference)) not between 4 and 100
     or new.transfer_reference ~ '[[:cntrl:]]'
  then raise exception 'Invalid transfer reference'; end if;
  if exists (
    select 1 from public.purchase_requests
    where user_id = new.user_id and created_at > now() - interval '1 hour'
    group by user_id having count(*) >= 5
  ) then raise exception 'Too many purchase requests. Please try again later'; end if;
  select (payload->>'price')::numeric into v_expected_amount
  from public.course_catalog where id = new.course_id and payload->>'publishState' = 'published';
  if v_expected_amount is null then raise exception 'Course is not available for purchase'; end if;
  if now() < (select (payload->>'salesOpenAt')::timestamptz from public.course_catalog where id = new.course_id)
     or now() > (select (payload->>'salesCloseAt')::timestamptz from public.course_catalog where id = new.course_id)
  then raise exception 'Course enrollment is not open'; end if;
  new.amount := v_expected_amount;
  new.status := 'pending';
  new.transfer_reference := trim(new.transfer_reference);
  return new;
end
$$;

create trigger before_purchase_request_insert before insert on public.purchase_requests
for each row execute procedure public.set_purchase_request_fields();

create or replace function public.create_purchase_request(p_course_id text, p_transfer_reference text)
returns public.purchase_requests language plpgsql security definer set search_path = ''
as $$
declare v_request public.purchase_requests%rowtype;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  insert into public.purchase_requests (user_id, course_id, amount, transfer_reference)
  values (auth.uid(), p_course_id, 1, p_transfer_reference)
  returning * into v_request;
  return v_request;
end
$$;

create or replace function public.save_course(
  p_id text,
  p_slug text,
  p_full_payload jsonb,
  p_student_payload jsonb,
  p_public_payload jsonb
)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  if not public.is_admin() then raise exception 'Administrator access required'; end if;
  if p_id is null or char_length(p_id) not between 1 and 100 then raise exception 'Invalid course ID'; end if;
  if p_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' then raise exception 'Invalid course slug'; end if;
  if p_full_payload->>'id' <> p_id or p_student_payload->>'id' <> p_id or p_public_payload->>'id' <> p_id
  then raise exception 'Course payload ID mismatch'; end if;
  if p_full_payload->>'slug' <> p_slug or p_student_payload->>'slug' <> p_slug or p_public_payload->>'slug' <> p_slug
  then raise exception 'Course payload slug mismatch'; end if;
  if p_full_payload->>'price' is null or (p_full_payload->>'price')::numeric < 0
  then raise exception 'Course price is invalid'; end if;
  if coalesce(p_full_payload->>'publishState', '') not in ('draft', 'published', 'archived')
  then raise exception 'Course publishing state is invalid'; end if;
  if (p_full_payload->>'price')::numeric is distinct from (p_student_payload->>'price')::numeric
     or (p_full_payload->>'price')::numeric is distinct from (p_public_payload->>'price')::numeric
     or p_full_payload->>'publishState' is distinct from p_student_payload->>'publishState'
     or p_full_payload->>'publishState' is distinct from p_public_payload->>'publishState'
     or p_full_payload->>'salesOpenAt' is distinct from p_public_payload->>'salesOpenAt'
     or p_full_payload->>'salesCloseAt' is distinct from p_public_payload->>'salesCloseAt'
     or p_full_payload->>'accessOpenAt' is distinct from p_public_payload->>'accessOpenAt'
     or p_full_payload->>'accessCloseAt' is distinct from p_public_payload->>'accessCloseAt'
  then raise exception 'Course commerce fields do not match'; end if;
  if p_full_payload->>'salesOpenAt' is null or p_full_payload->>'salesCloseAt' is null
     or p_full_payload->>'accessOpenAt' is null or p_full_payload->>'accessCloseAt' is null
  then raise exception 'Course dates are required'; end if;
  if (p_full_payload->>'salesCloseAt')::timestamptz <= (p_full_payload->>'salesOpenAt')::timestamptz
     or (p_full_payload->>'accessCloseAt')::timestamptz <= (p_full_payload->>'accessOpenAt')::timestamptz
  then raise exception 'Course dates are invalid'; end if;
  if jsonb_path_exists(p_student_payload, '$.sections[*].lessons[*].quiz[*].correctIndex')
     or jsonb_path_exists(p_student_payload, '$.sections[*].lessons[*].quiz[*].explanation')
  then raise exception 'Student payload contains protected quiz data'; end if;
  if jsonb_path_exists(p_public_payload, '$.sections[*].lessons[*].quiz[*]')
     or jsonb_path_exists(p_public_payload, '$.sections[*].lessons[*] ? (@.pdfUrl != null)')
     or jsonb_path_exists(p_public_payload, '$.sections[*].lessons[*] ? (@.isPreview == false && @.youtubeId != "")')
  then raise exception 'Public payload contains protected course data'; end if;
  if exists (
    select 1
    from jsonb_array_elements(p_full_payload->'sections') s,
      lateral jsonb_array_elements(s->'lessons') l
    group by l->>'id' having count(*) > 1
  ) then raise exception 'Lesson IDs must be unique'; end if;
  if exists (
    select 1
    from public.courses c,
      lateral jsonb_array_elements(c.payload->'sections') s,
      lateral jsonb_array_elements(s->'lessons') l
    where c.id <> p_id and l->>'id' in (
      select new_lesson->>'id'
      from jsonb_array_elements(p_full_payload->'sections') new_section,
        lateral jsonb_array_elements(new_section->'lessons') new_lesson
    )
  ) then raise exception 'A lesson ID is already used by another course'; end if;
  if coalesce((
      select array_agg(l->>'id' order by l->>'id')
      from jsonb_array_elements(p_full_payload->'sections') s,
        lateral jsonb_array_elements(s->'lessons') l
    ), array[]::text[]) <> coalesce((
      select array_agg(l->>'id' order by l->>'id')
      from jsonb_array_elements(p_student_payload->'sections') s,
        lateral jsonb_array_elements(s->'lessons') l
    ), array[]::text[])
  then raise exception 'Student course structure mismatch'; end if;
  if coalesce((
      select array_agg(l->>'id' order by l->>'id')
      from jsonb_array_elements(p_full_payload->'sections') s,
        lateral jsonb_array_elements(s->'lessons') l
    ), array[]::text[]) <> coalesce((
      select array_agg(l->>'id' order by l->>'id')
      from jsonb_array_elements(p_public_payload->'sections') s,
        lateral jsonb_array_elements(s->'lessons') l
    ), array[]::text[])
  then raise exception 'Public course structure mismatch'; end if;

  insert into public.courses (id, slug, payload, updated_at)
  values (p_id, p_slug, p_full_payload, now())
  on conflict (id) do update set slug = excluded.slug, payload = excluded.payload, updated_at = now();
  insert into public.student_courses (id, slug, payload, updated_at)
  values (p_id, p_slug, p_student_payload, now())
  on conflict (id) do update set slug = excluded.slug, payload = excluded.payload, updated_at = now();
  insert into public.course_catalog (id, slug, payload, updated_at)
  values (p_id, p_slug, p_public_payload, now())
  on conflict (id) do update set slug = excluded.slug, payload = excluded.payload, updated_at = now();
end
$$;

create or replace function public.save_lesson_progress(
  p_course_id text,
  p_lesson_id text,
  p_position_sec integer,
  p_watched_sec integer,
  p_percent integer
)
returns public.lesson_progress language plpgsql security definer set search_path = ''
as $$
declare
  v_existing public.lesson_progress%rowtype;
  v_result public.lesson_progress%rowtype;
  v_allowed_increase integer;
  v_accepted_increase integer;
  v_today date := (now() at time zone 'Africa/Cairo')::date;
begin
  if auth.uid() is null or not public.has_active_course_access(p_course_id) then
    raise exception 'Active course access required';
  end if;
  if not exists (
    select 1 from public.student_courses c,
      lateral jsonb_array_elements(c.payload->'sections') s,
      lateral jsonb_array_elements(s->'lessons') l
    where c.id = p_course_id and l->>'id' = p_lesson_id and (l->>'published')::boolean = true
  ) then raise exception 'Lesson not found'; end if;

  select * into v_existing from public.lesson_progress
  where user_id = auth.uid() and lesson_id = p_lesson_id for update;

  if found then
    v_allowed_increase := greatest(15, floor(extract(epoch from (now() - v_existing.updated_at)))::integer + 5);
    v_accepted_increase := least(greatest(p_watched_sec - v_existing.watched_sec, 0), v_allowed_increase);
  else
    v_accepted_increase := least(greatest(p_watched_sec, 0), 15);
  end if;

  insert into public.lesson_progress (
    user_id, course_id, lesson_id, last_position_sec, watched_sec, percent, completed, updated_at
  ) values (
    auth.uid(), p_course_id, p_lesson_id,
    least(greatest(coalesce(p_position_sec, 0), 0), 86400),
    coalesce(v_existing.watched_sec, 0) + v_accepted_increase,
    least(greatest(coalesce(p_percent, 0), 0), 100),
    coalesce(v_existing.completed, false), now()
  )
  on conflict (user_id, lesson_id) do update set
    last_position_sec = excluded.last_position_sec,
    watched_sec = excluded.watched_sec,
    percent = greatest(public.lesson_progress.percent, excluded.percent),
    updated_at = now()
  returning * into v_result;

  if v_accepted_increase > 0 then
    insert into public.daily_watch_time (user_id, activity_date, watched_sec)
    values (auth.uid(), v_today, v_accepted_increase)
    on conflict (user_id, activity_date) do update
      set watched_sec = least(86400, public.daily_watch_time.watched_sec + excluded.watched_sec);
    if (select watched_sec from public.daily_watch_time where user_id = auth.uid() and activity_date = v_today) >= 600 then
      insert into public.activity_days (user_id, activity_date) values (auth.uid(), v_today)
      on conflict do nothing;
    end if;
  end if;
  return v_result;
end
$$;

create or replace function public.submit_quiz_attempt(
  p_course_id text,
  p_lesson_id text,
  p_answers jsonb
)
returns table (
  attempt_id uuid,
  score integer,
  passed boolean,
  correct_indexes jsonb,
  explanations jsonb,
  taken_at timestamptz
) language plpgsql security definer set search_path = ''
as $$
declare
  v_quiz jsonb;
  v_question_count integer;
  v_correct_count integer;
  v_score integer;
  v_passed boolean;
  v_attempt_id uuid;
  v_taken_at timestamptz := now();
  v_today date := (now() at time zone 'Africa/Cairo')::date;
begin
  if auth.uid() is null or not public.has_active_course_access(p_course_id) then
    raise exception 'Active course access required';
  end if;
  if jsonb_typeof(p_answers) <> 'array' then raise exception 'Answers must be an array'; end if;
  if exists (
    select 1 from public.quiz_attempts
    where user_id = auth.uid() and lesson_id = p_lesson_id and taken_at > now() - interval '3 seconds'
  ) then raise exception 'Please wait before submitting the quiz again'; end if;
  if (
    select count(*) from public.quiz_attempts
    where user_id = auth.uid() and lesson_id = p_lesson_id and taken_at > now() - interval '1 hour'
  ) >= 10 then raise exception 'Quiz attempt limit reached. Please review the lesson and try again later'; end if;

  select l->'quiz' into v_quiz
  from public.courses c,
    lateral jsonb_array_elements(c.payload->'sections') s,
    lateral jsonb_array_elements(s->'lessons') l
  where c.id = p_course_id and l->>'id' = p_lesson_id and (l->>'published')::boolean = true;

  v_question_count := coalesce(jsonb_array_length(v_quiz), 0);
  if v_question_count = 0 then raise exception 'Quiz not found'; end if;
  if jsonb_array_length(p_answers) <> v_question_count then raise exception 'Every question must be answered'; end if;
  if exists (
    select 1 from jsonb_array_elements(v_quiz) with ordinality q(item, n)
    where jsonb_typeof(p_answers->(n - 1)::integer) <> 'number'
      or (p_answers->>(n - 1)::integer)::integer < 0
      or (p_answers->>(n - 1)::integer)::integer >= jsonb_array_length(item->'choices')
  ) then raise exception 'One or more answers are invalid'; end if;

  select count(*) into v_correct_count
  from jsonb_array_elements(v_quiz) with ordinality q(item, n)
  where (p_answers->>(n - 1)::integer)::integer = (item->>'correctIndex')::integer;
  v_score := round((v_correct_count::numeric / v_question_count::numeric) * 100)::integer;
  v_passed := v_score >= 70;

  insert into public.quiz_attempts (user_id, course_id, lesson_id, score, passed, answers, taken_at)
  values (auth.uid(), p_course_id, p_lesson_id, v_score, v_passed, p_answers, v_taken_at)
  returning id into v_attempt_id;

  if v_passed then
    insert into public.lesson_progress (user_id, course_id, lesson_id, percent, completed, updated_at)
    values (auth.uid(), p_course_id, p_lesson_id, 100, true, now())
    on conflict (user_id, lesson_id) do update set completed = true, percent = 100, updated_at = now();
    insert into public.activity_days (user_id, activity_date) values (auth.uid(), v_today)
    on conflict do nothing;
  end if;

  return query select
    v_attempt_id,
    v_score,
    v_passed,
    (select jsonb_agg((item->>'correctIndex')::integer order by n) from jsonb_array_elements(v_quiz) with ordinality q(item, n)),
    (select jsonb_agg(coalesce(item->>'explanation', '') order by n) from jsonb_array_elements(v_quiz) with ordinality q(item, n)),
    v_taken_at;
end
$$;

create or replace function public.review_purchase_request(p_request_id uuid, p_approve boolean, p_reason text default null)
returns void language plpgsql security definer set search_path = ''
as $$
declare v_request public.purchase_requests%rowtype;
begin
  if not public.is_admin() then raise exception 'Administrator access required'; end if;
  select * into v_request from public.purchase_requests where id = p_request_id for update;
  if not found then raise exception 'Purchase request not found'; end if;
  if v_request.status <> 'pending' then raise exception 'Purchase request was already reviewed'; end if;
  update public.purchase_requests set
    status = case when p_approve then 'approved'::public.purchase_status else 'rejected'::public.purchase_status end,
    reviewed_at = now(), reviewed_by = auth.uid(),
    rejection_reason = case when p_approve then null else left(nullif(trim(p_reason), ''), 500) end
  where id = p_request_id;
  if p_approve then
    insert into public.enrollments (user_id, course_id, source, revoked)
    values (v_request.user_id, v_request.course_id, 'purchase', false)
    on conflict (user_id, course_id) do update
      set revoked = false, source = 'purchase', enrolled_at = now();
  end if;
end
$$;

create or replace function public.grant_course_access(p_user_id uuid, p_course_id text)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  if not public.is_admin() then raise exception 'Administrator access required'; end if;
  if not exists (select 1 from public.profiles where id = p_user_id and role = 'student') then
    raise exception 'Student not found';
  end if;
  insert into public.enrollments (user_id, course_id, source, revoked)
  values (p_user_id, p_course_id, 'granted', false)
  on conflict (user_id, course_id) do update set revoked = false, source = 'granted', enrolled_at = now();
end
$$;

create or replace function public.revoke_course_access(p_user_id uuid, p_course_id text)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  if not public.is_admin() then raise exception 'Administrator access required'; end if;
  update public.enrollments set revoked = true where user_id = p_user_id and course_id = p_course_id;
end
$$;

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.student_courses enable row level security;
alter table public.course_catalog enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.bookmarks enable row level security;
alter table public.purchase_requests enable row level security;
alter table public.announcements enable row level security;
alter table public.activity_days enable row level security;
alter table public.daily_watch_time enable row level security;

create policy profiles_read on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy profiles_update on public.profiles for update using (id = auth.uid() or public.is_admin())
with check (public.is_admin() or (id = auth.uid() and role = 'student'));
create policy courses_admin_read on public.courses for select using (public.is_admin());
create policy student_courses_read on public.student_courses for select
using (public.is_admin() or public.has_active_course_access(id));
create policy course_catalog_read on public.course_catalog for select
using (payload->>'publishState' = 'published' or public.is_admin());
create policy enrollments_read on public.enrollments for select using (user_id = auth.uid() or public.is_admin());
create policy progress_read on public.lesson_progress for select using (user_id = auth.uid() or public.is_admin());
create policy attempts_read on public.quiz_attempts for select using (user_id = auth.uid() or public.is_admin());
create policy bookmarks_read on public.bookmarks for select using (user_id = auth.uid());
create policy bookmarks_insert on public.bookmarks for insert with check (
  user_id = auth.uid()
  and public.has_active_course_access(course_id)
  and exists (
    select 1 from public.student_courses c,
      lateral jsonb_array_elements(c.payload->'sections') s,
      lateral jsonb_array_elements(s->'lessons') l
    where c.id = course_id and l->>'id' = lesson_id and (l->>'published')::boolean = true
  )
);
create policy bookmarks_delete on public.bookmarks for delete using (user_id = auth.uid());
create policy purchases_read on public.purchase_requests for select using (user_id = auth.uid() or public.is_admin());
create policy announcements_read on public.announcements for select to authenticated using (
  public.is_admin()
  or (course_id is null and exists (
    select 1 from public.enrollments e where e.user_id = auth.uid() and e.revoked = false
  ))
  or (course_id is not null and public.has_active_course_access(course_id))
);
create policy announcements_admin_write on public.announcements for all using (public.is_admin()) with check (public.is_admin());
create policy activity_read on public.activity_days for select using (user_id = auth.uid() or public.is_admin());
create policy daily_watch_read on public.daily_watch_time for select using (user_id = auth.uid() or public.is_admin());

revoke all on all tables in schema public from anon, authenticated;
grant select on public.course_catalog to anon, authenticated;
grant select on public.profiles, public.courses, public.student_courses, public.enrollments,
  public.lesson_progress, public.quiz_attempts, public.purchase_requests, public.announcements,
  public.activity_days, public.daily_watch_time to authenticated;
grant update (full_name, phone, university, academic_year, updated_at) on public.profiles to authenticated;
grant select, insert, delete on public.bookmarks to authenticated;
grant insert, delete on public.announcements to authenticated;

revoke all on function public.is_admin() from public;
revoke all on function public.has_active_course_access(text) from public;
revoke all on function public.save_course(text, text, jsonb, jsonb, jsonb) from public;
revoke all on function public.create_purchase_request(text, text) from public;
revoke all on function public.save_lesson_progress(text, text, integer, integer, integer) from public;
revoke all on function public.submit_quiz_attempt(text, text, jsonb) from public;
revoke all on function public.review_purchase_request(uuid, boolean, text) from public;
revoke all on function public.grant_course_access(uuid, text) from public;
revoke all on function public.revoke_course_access(uuid, text) from public;
revoke all on function public.handle_new_user() from public;
revoke all on function public.touch_updated_at() from public;
revoke all on function public.set_purchase_request_fields() from public;
grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.has_active_course_access(text) to authenticated;
grant execute on function public.save_course(text, text, jsonb, jsonb, jsonb) to authenticated;
grant execute on function public.create_purchase_request(text, text) to authenticated;
grant execute on function public.save_lesson_progress(text, text, integer, integer, integer) to authenticated;
grant execute on function public.submit_quiz_attempt(text, text, jsonb) to authenticated;
grant execute on function public.review_purchase_request(uuid, boolean, text) to authenticated;
grant execute on function public.grant_course_access(uuid, text) to authenticated;
grant execute on function public.revoke_course_access(uuid, text) to authenticated;
