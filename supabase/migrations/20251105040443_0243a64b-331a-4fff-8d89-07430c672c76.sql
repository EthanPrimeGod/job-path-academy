-- Fix function search_path - use pg_catalog and public schemas explicitly
drop function if exists public.has_role(uuid, app_role);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language plpgsql
stable
security definer
set search_path = pg_catalog, public
as $$
begin
  return exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  );
end;
$$;