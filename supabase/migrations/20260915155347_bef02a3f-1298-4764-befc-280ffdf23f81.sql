create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create table public.itinerary_requests (
  id uuid primary key default gen_random_uuid(),
  nome text,
  email text not null,
  destino text,
  datas text,
  dias text,
  pessoas text,
  orcamento text,
  ritmo text,
  interesses text,
  restricoes text,
  alojamento text,
  partida text,
  observacoes text,
  created_at timestamptz not null default now()
);
grant select on public.itinerary_requests to authenticated;
grant all on public.itinerary_requests to service_role;
alter table public.itinerary_requests enable row level security;
create policy "Admins can read requests" on public.itinerary_requests for select to authenticated using (public.has_role(auth.uid(), 'admin'));

insert into public.user_roles (user_id, role)
values ('4a6653ca-f59a-4217-85c8-7dfefeae4ab6', 'admin')
on conflict (user_id, role) do nothing;