# Project Modules

The app is organized by feature so future changes can be scoped to the module they affect.

## Feature Modules

- `src/features/home`
  - Home page and chapter selection.
- `src/features/quiz`
  - Main answering flow, question feedback, question editor, and progress bar UI.
- `src/features/wrong-book`
  - Wrong-book list, directory filtering, and review mode.
- `src/features/auth`
  - Login/register UI and local auth helpers.
- `src/features/question-bank`
  - Question-bank loading, cache updates, and cloud question edits.
- `src/features/progress`
  - Progress storage, local sync queue, and Supabase progress sync.
- `src/features/quiz-admin`
  - Question-bank sync/admin page.

## Shared Modules

- `src/shared/layout`
  - App layout pieces such as the header.
- `src/shared/hooks`
  - Reusable React hooks.
- `src/shared/services`
  - Cross-feature services such as clipboard, AI, and translation helpers.
- `src/shared/lib`
  - External client setup, currently Supabase.

## Change Routing

- Answering UI changes: start in `src/features/quiz`.
- Wrong-book changes: start in `src/features/wrong-book`.
- Login/account changes: start in `src/features/auth`.
- Question cloud/cache behavior: start in `src/features/question-bank`.
- Progress behavior: start in `src/features/progress`.
- Header/navigation changes: start in `src/shared/layout`.
