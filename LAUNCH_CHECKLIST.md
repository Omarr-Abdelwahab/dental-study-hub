# Denta Help launch checklist

## Required account setup

- Create the production Supabase project and apply `supabase/migrations/202609240001_production_schema.sql`.
- Configure the production variables listed in `.env.example` on the hosting provider.
- Add the production `/auth` and `/reset-password` redirect URLs in Supabase Authentication.
- Enable email confirmation, CAPTCHA, leaked-password protection, and production SMTP.
- Create an account normally and promote the first administrator using `supabase/README.md`.
- Enable database backups appropriate to the selected Supabase plan.

## InstaPay operations

- Configure `VITE_INSTAPAY_ADDRESS` with the exact receiving number or IPA shown in the receiving account.
- Make a small real transfer and confirm its reference can be submitted, found in the admin queue, approved, and converted into course access.
- Reject a test transfer with a reason and confirm the student sees the reason and can submit a corrected reference.
- Restrict payment-review access to named administrators and reconcile approved requests against the receiving InstaPay account every day.
- Document who handles payment disputes, refunds, duplicate transfers, and requests submitted after a course sales window closes.

## Required verification

- Run `npm run launch:check` after adding production environment variables.
- Run `npm run check` and require a successful production build.
- Test registration, email verification, sign-in, password recovery, profile updates, and sign-out.
- Test administrator course editing, announcements, access grants, and access revocation.
- Test the complete InstaPay workflow on both mobile and desktop, including copy, submit, duplicate-reference rejection, approval confirmation, rejection, and retry.
- Test every course and slide deck on current Safari, Chrome, Edge, iOS, and Android.
- Confirm the support email and phone are actively monitored.

## Search and operations

- The production build generates `sitemap.xml` and updates `robots.txt` from `VITE_SITE_URL`.
- Submit `/sitemap.xml` to the chosen search-engine webmaster tools after deployment.
- Verify the social preview image and page title on the final domain.
- Enable hosting logs, uptime alerts, and Supabase database alerts before inviting students.
- Review the privacy policy and terms with an appropriately qualified professional before launch.
