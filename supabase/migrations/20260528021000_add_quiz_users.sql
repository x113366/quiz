create extension if not exists pgcrypto;

create table if not exists public.quiz_users (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  password_hash text not null,
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create unique index if not exists quiz_users_username_lower_idx
  on public.quiz_users (lower(username));

alter table public.quiz_users enable row level security;

revoke all on public.quiz_users from anon, authenticated;

create or replace function public.quiz_register_user(
  p_username text,
  p_password text
)
returns table(id uuid, username text)
language plpgsql
security definer
set search_path = public
as $$
declare
  clean_username text;
begin
  clean_username := lower(trim(coalesce(p_username, '')));

  if clean_username !~ '^[a-z0-9_-]{3,32}$' then
    raise exception '用户名需为3-32位，只能包含字母、数字、下划线或短横线';
  end if;

  if length(coalesce(p_password, '')) < 6 then
    raise exception '密码至少需要6位';
  end if;

  insert into public.quiz_users (username, password_hash)
  values (clean_username, extensions.crypt(p_password, extensions.gen_salt('bf')))
  returning quiz_users.id, quiz_users.username
  into id, username;

  return next;
exception
  when unique_violation then
    raise exception '用户名已存在';
end;
$$;

create or replace function public.quiz_login_user(
  p_username text,
  p_password text
)
returns table(id uuid, username text)
language plpgsql
security definer
set search_path = public
as $$
declare
  clean_username text;
  found_id uuid;
  found_username text;
begin
  clean_username := lower(trim(coalesce(p_username, '')));

  select quiz_users.id, quiz_users.username
  into found_id, found_username
  from public.quiz_users
  where lower(quiz_users.username) = clean_username
    and quiz_users.password_hash = extensions.crypt(coalesce(p_password, ''), quiz_users.password_hash)
  limit 1;

  if found_id is null then
    raise exception '用户名或密码错误';
  end if;

  update public.quiz_users
  set last_login_at = now()
  where quiz_users.id = found_id;

  id := found_id;
  username := found_username;

  return next;
end;
$$;

grant execute on function public.quiz_register_user(text, text) to anon, authenticated;
grant execute on function public.quiz_login_user(text, text) to anon, authenticated;
