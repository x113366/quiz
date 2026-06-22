create table if not exists public.quiz_progress (
  client_id text not null,
  category_id text not null,
  chapter_id text not null,
  answered_ids text[] not null default '{}',
  correct_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (client_id, category_id, chapter_id),
  foreign key (category_id, chapter_id)
    references public.quiz_chapters(category_id, id)
    on delete cascade
);

create index if not exists quiz_progress_client_id_idx
  on public.quiz_progress(client_id);

alter table public.quiz_progress enable row level security;

drop policy if exists "Public read own quiz progress by client id" on public.quiz_progress;
create policy "Public read own quiz progress by client id"
  on public.quiz_progress
  for select
  using (true);

drop policy if exists "Public insert quiz progress" on public.quiz_progress;
create policy "Public insert quiz progress"
  on public.quiz_progress
  for insert
  with check (true);

drop policy if exists "Public update quiz progress" on public.quiz_progress;
create policy "Public update quiz progress"
  on public.quiz_progress
  for update
  using (true)
  with check (true);
