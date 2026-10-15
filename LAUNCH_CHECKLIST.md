# Denta Help launch checklist

Payment setup is intentionally outside this checklist.

## Required account setup

- Create the production Supabase project and apply `supabase/migrations/202609240001_production_schema.sql`.
- Configure the production variables listed in `.env.example` on the hosting provider.
- Add the production `/auth` and `/reset-password` redirect URLs in Supabase Authentication.
- Enable email confirmation, CAPTCHA, leaked-password protection, and production SMTP.
- Create an account normally and promote the first administrator using `supabase/README.md`.
- Enable database backups appropriate to the selected Supabase plan.

## Required verification

- Run `npm run launch:check` after adding production environment variables.
- Run `npm run check` and require a successful production build.
- Test registration, email verification, sign-in, password recovery, profile updates, and sign-out.
- Test administrator course editing, announcements, access grants, and access revocation.
- Test every course and slide deck on current Safari, Chrome, Edge, iOS, and Android.
- Confirm the support email and phone are actively monitored.

## Search and operations

- The production build generates `sitemap.xml` and updates `robots.txt` from `VITE_SITE_URL`.
- Submit `/sitemap.xml` to the chosen search-engine webmaster tools after deployment.
- Verify the social preview image and page title on the final domain.
- Enable hosting logs, uptime alerts, and Supabase database alerts before inviting students.
- Review the privacy policy and terms with an appropriately qualified professional before launch.
