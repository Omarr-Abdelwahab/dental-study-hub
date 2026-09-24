# Dental Study Hub

The project is organized as an npm monorepo with independent frontend and backend workspaces.

```text
dental-study-hub/
├── frontend/  TanStack Start web application
└── backend/   API workspace (framework to be selected)
```

## Frontend

Run the existing application from the repository root:

```bash
npm install
npm run dev
```

The root `build`, `lint`, `typecheck`, and `check` commands currently target the frontend.

## Backend

The backend folder is deliberately framework-neutral. Its runtime, database, authentication, and
deployment architecture will be selected before application code is added.

When Vercel deployment is configured again, set the project's **Root Directory** to `frontend`.
