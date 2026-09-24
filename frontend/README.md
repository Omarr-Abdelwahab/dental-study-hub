# Denta Help frontend

Production-oriented TanStack Start application for course discovery, authenticated student learning, and administration.

## Features

- Supabase email/password authentication, email verification, sign-out, and password recovery
- Durable profiles, progress, quiz attempts, bookmarks, streak activity, announcements, and enrollments
- InstaPay purchase requests that remain pending until an administrator approves or rejects them
- Transactional approval that activates course access exactly once
- Row-level authorization for student-owned data and administrator operations
- Separate public course catalog and protected paid course content
- Student and administrator dashboards, course editing, lesson playback, slides, and quizzes

## Local setup

1. Apply `../supabase/migrations/202609240001_production_schema.sql` to a Supabase project.
2. Copy `../.env.example` to `../.env.local` and fill in every value.
3. From the repository root, run:

```bash
npm install
npm run dev
```

See `../supabase/README.md` for the first-administrator setup. Never add a Supabase service-role key to a `VITE_` variable.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```
