# Supabase setup

1. Create a Supabase project and run `migrations/202609240001_production_schema.sql` in the SQL editor.
2. Copy `.env.example` to `.env.local` and fill in the public project URL, publishable key, real InstaPay address, and support details.
3. In Authentication > URL Configuration, add the production origin plus `/auth` and `/reset-password` redirect URLs.
4. In Authentication, require email confirmation, set a strong minimum password policy, enable
   leaked-password protection and CAPTCHA, and configure a production SMTP provider. Keep the
   default authentication rate limits enabled or make them stricter.
5. Create the first account normally, then promote it once in the SQL editor:

```sql
update public.profiles set role = 'admin' where email = 'YOUR_ADMIN_EMAIL';
```

6. Sign in to the admin workspace once. On the first admin load, the built-in starting catalog is
   copied into the protected course and public catalog tables. From then on, edits are durable.
7. Enable database backups and point-in-time recovery appropriate to your Supabase plan before
   accepting real payments.

Never expose the Supabase service-role key in a `VITE_` variable or in browser code.
