-- Harden payment reviews for projects that already applied the production schema.
-- Rejections require an actionable reason; approval and enrollment remain one transaction.
create or replace function public.review_purchase_request(
  p_request_id uuid,
  p_approve boolean,
  p_reason text default null
)
returns void language plpgsql security definer set search_path = ''
as $$
declare v_request public.purchase_requests%rowtype;
begin
  if not public.is_admin() then raise exception 'Administrator access required'; end if;
  if p_approve is null then raise exception 'Review decision is required'; end if;
  if not p_approve and char_length(coalesce(trim(p_reason), '')) < 3 then
    raise exception 'A rejection reason is required';
  end if;

  select * into v_request
  from public.purchase_requests
  where id = p_request_id
  for update;

  if not found then raise exception 'Purchase request not found'; end if;
  if v_request.status <> 'pending' then
    raise exception 'Purchase request was already reviewed';
  end if;

  update public.purchase_requests set
    status = case
      when p_approve then 'approved'::public.purchase_status
      else 'rejected'::public.purchase_status
    end,
    reviewed_at = now(),
    reviewed_by = auth.uid(),
    rejection_reason = case when p_approve then null else left(trim(p_reason), 500) end
  where id = p_request_id;

  if p_approve then
    insert into public.enrollments (user_id, course_id, source, revoked)
    values (v_request.user_id, v_request.course_id, 'purchase', false)
    on conflict (user_id, course_id) do update
      set revoked = false, source = 'purchase', enrolled_at = now();
  end if;
end
$$;

revoke all on function public.review_purchase_request(uuid, boolean, text) from public;
grant execute on function public.review_purchase_request(uuid, boolean, text) to authenticated;
