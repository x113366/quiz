create or replace function public.quiz_delete_category_for_editor(
  p_user_id uuid,
  p_category_id text
)
returns table(
  deleted_category_id text,
  deleted_chapter_count integer,
  deleted_question_count integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  editor_username text;
begin
  select lower(quiz_users.username)
  into editor_username
  from public.quiz_users
  where quiz_users.id = p_user_id
  limit 1;

  if editor_username is distinct from 'x113366' then
    raise exception '当前账号没有删除云端题库的权限';
  end if;

  if nullif(trim(coalesce(p_category_id, '')), '') is null then
    raise exception '题库分类 ID 不能为空';
  end if;

  deleted_category_id := p_category_id;

  select count(*)
  into deleted_chapter_count
  from public.quiz_chapters
  where category_id = p_category_id;

  select count(*)
  into deleted_question_count
  from public.quiz_questions
  where category_id = p_category_id;

  delete from public.quiz_categories
  where id = p_category_id;

  return next;
end;
$$;

grant execute on function public.quiz_delete_category_for_editor(uuid, text)
  to anon, authenticated;

notify pgrst, 'reload schema';
