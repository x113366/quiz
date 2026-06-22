create table if not exists public.quiz_categories (
  id text primary key,
  name text not null,
  description text not null default '',
  icon text not null default '📝',
  color text not null default '#666666',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_chapters (
  id text not null,
  category_id text not null references public.quiz_categories(id) on delete cascade,
  name text not null,
  description text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (category_id, id)
);

create table if not exists public.quiz_questions (
  id text primary key,
  category_id text not null,
  chapter_id text not null,
  question text not null,
  options jsonb not null,
  correct_answer jsonb not null,
  explanation text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (category_id, chapter_id)
    references public.quiz_chapters(category_id, id)
    on delete cascade
);

create index if not exists quiz_chapters_category_id_idx
  on public.quiz_chapters(category_id);

create index if not exists quiz_questions_category_chapter_idx
  on public.quiz_questions(category_id, chapter_id, sort_order);

alter table public.quiz_categories enable row level security;
alter table public.quiz_chapters enable row level security;
alter table public.quiz_questions enable row level security;

drop policy if exists "Public read quiz categories" on public.quiz_categories;
create policy "Public read quiz categories"
  on public.quiz_categories
  for select
  using (true);

drop policy if exists "Public read quiz chapters" on public.quiz_chapters;
create policy "Public read quiz chapters"
  on public.quiz_chapters
  for select
  using (true);

drop policy if exists "Public read quiz questions" on public.quiz_questions;
create policy "Public read quiz questions"
  on public.quiz_questions
  for select
  using (true);
