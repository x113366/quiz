create or replace function public.quiz_update_question_for_editor(
  p_user_id uuid,
  p_question_id text,
  p_options jsonb,
  p_correct_answer jsonb,
  p_explanation text
)
returns table(
  id text,
  category_id text,
  chapter_id text,
  question text,
  options jsonb,
  correct_answer jsonb,
  explanation text,
  sort_order integer
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
    raise exception '当前账号没有编辑题目的权限';
  end if;

  if p_options is null or jsonb_typeof(p_options) <> 'object' then
    raise exception '选项格式不正确';
  end if;

  if p_correct_answer is null then
    raise exception '正确答案不能为空';
  end if;

  return query
  update public.quiz_questions
  set
    options = p_options,
    correct_answer = p_correct_answer,
    explanation = coalesce(p_explanation, ''),
    updated_at = now()
  where quiz_questions.id = p_question_id
  returning
    quiz_questions.id,
    quiz_questions.category_id,
    quiz_questions.chapter_id,
    quiz_questions.question,
    quiz_questions.options,
    quiz_questions.correct_answer,
    quiz_questions.explanation,
    quiz_questions.sort_order;

  if not found then
    raise exception '题目不存在';
  end if;
end;
$$;

grant execute on function public.quiz_update_question_for_editor(uuid, text, jsonb, jsonb, text)
  to anon, authenticated;
