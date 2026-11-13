create or replace function public.public_stamp_stats()
returns table(total bigint, this_month bigint, travellers bigint)
language sql stable security definer set search_path = public
as $$
  with s as (
    select p.user_id, st.value->>'at' as at
    from public.passports p
    cross join lateral jsonb_each(coalesce(p.data,'{}'::jsonb)) c
    cross join lateral jsonb_each(coalesce(c.value->'stamps','{}'::jsonb)) st
    where not public.has_role(p.user_id, 'admin')
  )
  select count(*),
         count(*) filter (where at >= to_char(date_trunc('month', now()), 'YYYY-MM-DD')),
         count(distinct user_id)
  from s;
$$;
grant execute on function public.public_stamp_stats() to anon, authenticated;