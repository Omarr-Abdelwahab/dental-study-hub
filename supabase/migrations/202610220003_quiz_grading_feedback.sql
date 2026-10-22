-- Keep quiz grading available even when an administrator has not recently opened the
-- course editor. Students can never select this table; only the security-definer
-- grading function can read it after a submitted attempt.
create table if not exists public.quiz_answer_keys (
  course_id text not null,
  lesson_id text not null,
  correct_indexes jsonb not null check (jsonb_typeof(correct_indexes) = 'array'),
  explanations jsonb not null check (jsonb_typeof(explanations) = 'array'),
  updated_at timestamptz not null default now(),
  primary key (course_id, lesson_id)
);

alter table public.quiz_answer_keys enable row level security;
revoke all on table public.quiz_answer_keys from anon, authenticated;

insert into public.quiz_answer_keys (course_id, lesson_id, correct_indexes, explanations)
values
  (
    'course-fixed-prosthodontics',
    'lesson-full-veneer-crown-prep',
    '[1,1,1,2]'::jsonb,
    '["The correct reduction is 2 mm on the buccal functional cusp and 1 mm on the lingual cusp.","The palatal cusps are the functional cusps of maxillary molars.","Keeping the contra-angle parallel to the tooth''s long axis guides the axial preparation.","The secondary plane is located on the occlusal third of the buccal surface."]'::jsonb
  ),
  (
    'course-fixed-prosthodontics',
    'lesson-veneered-crown-prep',
    '[0,2,0,1]'::jsonb,
    '["The extra porcelain layer is placed on the buccal surface for the veneered restoration.","A needle stone is used to open the proximal contact.","The keyed buccal reduction is 1.5 mm.","The keyed palatal reduction is 0.5 mm."]'::jsonb
  ),
  (
    'course-fixed-prosthodontics',
    'lesson-all-ceramic-crown-prep',
    '[1,0,2,1]'::jsonb,
    '["The keyed incisal-edge reduction is 2 mm.","The keyed palatal-fossa reduction is 1 mm.","The secondary plane is prepared on the incisal third.","A football or flame stone follows the contour of the lingual fossa."]'::jsonb
  ),
  (
    'course-operative',
    'lesson-class-i-ii-cavities',
    '[0,2,2,1]'::jsonb,
    '["The keyed gingival-seat width is 1.5–2 mm.","The keyed proximal-box depth is 3 mm.","The keyed Class I cavity depth is 1.5 mm.","A sharp explorer is used to check that the contact has been opened."]'::jsonb
  ),
  (
    'course-operative',
    'lesson-class-i-ii-restoration',
    '[2,1,1,0]'::jsonb,
    '["A ball burnisher is used to adapt and condense the composite.","Dental composite is polymerized using a curing light.","A properly restored marginal ridge supports proximal contact and helps prevent food impaction.","Incremental placement helps reduce polymerization shrinkage stress."]'::jsonb
  ),
  (
    'course-operative',
    'lesson-class-iii-v',
    '[2,1,0,1]'::jsonb,
    '["Class V cavities are located in the cervical third of the tooth.","The keyed answer is the proximal and palatal location, without involving the incisal angle.","Poor oral hygiene increases plaque retention and the risk of these carious lesions.","The keyed preparation depth is 1.5 mm."]'::jsonb
  ),
  (
    'course-operative',
    'lesson-class-iv',
    '[2,0,2,1]'::jsonb,
    '["The index is used to establish the palatal shell first.","Finishing and polishing should be performed with water cooling.","Dentin composite is comparatively opaque to reproduce natural dentin.","Enamel composite is translucent to reproduce natural enamel."]'::jsonb
  )
on conflict (course_id, lesson_id) do update set
  correct_indexes = excluded.correct_indexes,
  explanations = excluded.explanations,
  updated_at = now();

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
  v_correct_indexes jsonb;
  v_explanations jsonb;
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
    select 1 from public.quiz_attempts qa
    where qa.user_id = auth.uid()
      and qa.lesson_id = p_lesson_id
      and qa.taken_at > now() - interval '3 seconds'
  ) then raise exception 'Please wait before submitting the quiz again'; end if;
  if (
    select count(*) from public.quiz_attempts qa
    where qa.user_id = auth.uid()
      and qa.lesson_id = p_lesson_id
      and qa.taken_at > now() - interval '1 hour'
  ) >= 10 then raise exception 'Quiz attempt limit reached. Please review the lesson and try again later'; end if;

  select l->'quiz' into v_quiz
  from public.student_courses c,
    lateral jsonb_array_elements(c.payload->'sections') s,
    lateral jsonb_array_elements(s->'lessons') l
  where c.id = p_course_id and l->>'id' = p_lesson_id and (l->>'published')::boolean = true;

  if coalesce(jsonb_array_length(v_quiz), 0) = 0 then
    select l->'quiz' into v_quiz
    from public.courses c,
      lateral jsonb_array_elements(c.payload->'sections') s,
      lateral jsonb_array_elements(s->'lessons') l
    where c.id = p_course_id and l->>'id' = p_lesson_id and (l->>'published')::boolean = true;
  end if;

  v_question_count := coalesce(jsonb_array_length(v_quiz), 0);
  if v_question_count = 0 then raise exception 'Quiz not found'; end if;

  select k.correct_indexes, k.explanations
  into v_correct_indexes, v_explanations
  from public.quiz_answer_keys k
  where k.course_id = p_course_id and k.lesson_id = p_lesson_id;

  -- Preserve support for future administrator-created quizzes whose keys are stored
  -- directly in the private full course payload.
  if coalesce(jsonb_array_length(v_correct_indexes), 0) <> v_question_count then
    select
      jsonb_agg((item->>'correctIndex')::integer order by n),
      jsonb_agg(coalesce(item->>'explanation', '') order by n)
    into v_correct_indexes, v_explanations
    from jsonb_array_elements(v_quiz) with ordinality q(item, n)
    where item ? 'correctIndex';
  end if;

  if coalesce(jsonb_array_length(v_correct_indexes), 0) <> v_question_count then
    raise exception 'Quiz answer key is unavailable';
  end if;
  if coalesce(jsonb_array_length(v_explanations), 0) <> v_question_count then
    v_explanations := (
      select jsonb_agg('Review this point in the lesson.' order by n)
      from generate_series(1, v_question_count) n
    );
  end if;
  if jsonb_array_length(p_answers) <> v_question_count then raise exception 'Every question must be answered'; end if;
  if exists (
    select 1 from jsonb_array_elements(v_quiz) with ordinality q(item, n)
    where jsonb_typeof(p_answers->(n - 1)::integer) <> 'number'
      or (p_answers->>(n - 1)::integer)::integer < 0
      or (p_answers->>(n - 1)::integer)::integer >= jsonb_array_length(item->'choices')
  ) then raise exception 'One or more answers are invalid'; end if;

  select count(*) into v_correct_count
  from jsonb_array_elements(v_correct_indexes) with ordinality k(item, n)
  where (p_answers->>(n - 1)::integer)::integer = (item #>> '{}')::integer;
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
    v_correct_indexes,
    v_explanations,
    v_taken_at;
end
$$;

revoke all on function public.submit_quiz_attempt(text, text, jsonb) from public;
grant execute on function public.submit_quiz_attempt(text, text, jsonb) to authenticated;
