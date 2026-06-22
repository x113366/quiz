create or replace function public.quiz_upsert_question_bank_for_editor(
  p_user_id uuid,
  p_question_bank jsonb
)
returns table(
  category_count integer,
  chapter_count integer,
  question_count integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  editor_username text;
  category_item jsonb;
  chapter_item jsonb;
  category_index integer;
  chapter_index integer;
  chapter_questions jsonb;
  question_item jsonb;
  question_index integer;
  question_category_id text;
  question_chapter_id text;
begin
  select lower(quiz_users.username)
  into editor_username
  from public.quiz_users
  where quiz_users.id = p_user_id
  limit 1;

  if editor_username is distinct from 'x113366' then
    raise exception '当前账号没有上传云端题库的权限';
  end if;

  if p_question_bank is null
    or jsonb_typeof(p_question_bank->'categories') <> 'array'
    or jsonb_typeof(p_question_bank->'questions') <> 'object' then
    raise exception '题库格式不正确';
  end if;

  category_count := 0;
  chapter_count := 0;
  question_count := 0;

  for category_item, category_index in
    select value, ordinality::integer
    from jsonb_array_elements(p_question_bank->'categories') with ordinality
  loop
    insert into public.quiz_categories (
      id,
      name,
      description,
      icon,
      color,
      sort_order,
      updated_at
    )
    values (
      category_item->>'id',
      coalesce(nullif(category_item->>'name', ''), '未命名分类'),
      coalesce(category_item->>'description', ''),
      coalesce(nullif(category_item->>'icon', ''), '📝'),
      coalesce(nullif(category_item->>'color', ''), '#666666'),
      category_index,
      now()
    )
    on conflict (id) do update
    set
      name = excluded.name,
      description = excluded.description,
      icon = excluded.icon,
      color = excluded.color,
      sort_order = excluded.sort_order,
      updated_at = now();

    category_count := category_count + 1;

    if jsonb_typeof(category_item->'chapters') = 'array' then
      for chapter_item, chapter_index in
        select value, ordinality::integer
        from jsonb_array_elements(category_item->'chapters') with ordinality
      loop
        insert into public.quiz_chapters (
          id,
          category_id,
          name,
          description,
          sort_order,
          updated_at
        )
        values (
          chapter_item->>'id',
          category_item->>'id',
          coalesce(nullif(chapter_item->>'name', ''), '未命名章节'),
          coalesce(chapter_item->>'description', ''),
          chapter_index,
          now()
        )
        on conflict (category_id, id) do update
        set
          name = excluded.name,
          description = excluded.description,
          sort_order = excluded.sort_order,
          updated_at = now();

        chapter_count := chapter_count + 1;
      end loop;
    end if;
  end loop;

  for question_category_id, chapter_item in
    select key, value
    from jsonb_each(p_question_bank->'questions')
  loop
    for question_chapter_id, chapter_questions in
      select key, value
      from jsonb_each(chapter_item)
    loop
      for question_item, question_index in
        select value, ordinality::integer
        from jsonb_array_elements(chapter_questions) with ordinality
      loop
        insert into public.quiz_questions (
          id,
          category_id,
          chapter_id,
          question,
          options,
          correct_answer,
          explanation,
          sort_order,
          updated_at
        )
        values (
          question_item->>'id',
          question_category_id,
          question_chapter_id,
          coalesce(nullif(question_item->>'question', ''), '暂无问题'),
          coalesce(question_item->'options', '{"a":"选项A","b":"选项B","c":"选项C","d":"选项D"}'::jsonb),
          coalesce(question_item->'correctAnswer', '"a"'::jsonb),
          coalesce(question_item->>'explanation', ''),
          question_index,
          now()
        )
        on conflict (id) do update
        set
          category_id = excluded.category_id,
          chapter_id = excluded.chapter_id,
          question = excluded.question,
          options = excluded.options,
          correct_answer = excluded.correct_answer,
          explanation = excluded.explanation,
          sort_order = excluded.sort_order,
          updated_at = now();

        question_count := question_count + 1;
      end loop;
    end loop;
  end loop;

  return next;
end;
$$;

grant execute on function public.quiz_upsert_question_bank_for_editor(uuid, jsonb)
  to anon, authenticated;

notify pgrst, 'reload schema';
