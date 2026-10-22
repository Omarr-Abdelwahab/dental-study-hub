-- Open the two implemented courses for an end-to-end InstaPay test.
-- EGP 1 is intentional test pricing and can be changed from the admin course editor later.
do $$
declare
  v_table text;
  v_course_id text;
begin
  foreach v_table in array array['courses', 'student_courses', 'course_catalog'] loop
    foreach v_course_id in array array['course-fixed-prosthodontics', 'course-operative'] loop
      execute format(
        'update public.%I
         set payload = jsonb_set(
           jsonb_set(
             jsonb_set(payload, ''{price}'', ''1''::jsonb, true),
             ''{salesOpenAt}'', to_jsonb(%L::text), true
           ),
           ''{accessOpenAt}'', to_jsonb(%L::text), true
         ),
         updated_at = now()
         where id = %L',
        v_table,
        '2026-10-01T00:00:00.000Z',
        '2026-10-01T00:00:00.000Z',
        v_course_id
      );
    end loop;
  end loop;
end
$$;
