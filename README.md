# Denta Help

Production-oriented online dental education platform built with TanStack Start and Supabase.

```text
dental-study-hub/
├── frontend/  Web application
└── supabase/  Database schema, policies, and transactional functions
```

## Run locally

1. Apply the migration in `supabase/migrations` to a Supabase project.
2. Copy `.env.example` to `.env.local` and configure every value.
3. Follow `supabase/README.md` to promote the first administrator.
4. Install and run the app:

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

The application includes email/password authentication and recovery, durable learning progress,
role-based authorization, a protected course-content model, InstaPay purchase requests, and
transactional administrator approval.
