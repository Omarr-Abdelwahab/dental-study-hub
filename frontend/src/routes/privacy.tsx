import { createFileRoute } from "@tanstack/react-router";
import { PublicPage } from "@/components/app-shell";
import { brand } from "@/config/brand";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });
function PrivacyPage() {
  return (
    <PublicPage>
      <article className="container-page max-w-3xl py-16">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">Legal</p>
        <h1 className="mt-2 text-4xl font-extrabold text-navy">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated 24 September 2026</p>
        <div className="mt-9 space-y-7 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="text-xl font-extrabold text-navy">Information we collect</h2>
            <p className="mt-2">
              We collect the account details you provide, course enrollment and payment-reference
              records, lesson progress, quiz attempts, bookmarks, and essential security logs needed
              to operate the service.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-navy">How we use it</h2>
            <p className="mt-2">
              We use this information to authenticate you, deliver purchased courses, remember
              learning progress, verify InstaPay transfers, provide support, prevent abuse, and
              improve reliability. We do not sell personal information.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-navy">Storage and access</h2>
            <p className="mt-2">
              Account and learning data is stored with our managed database provider. Access is
              restricted by account ownership and administrative role. Passwords are handled by the
              authentication provider and are not stored in this website’s application data.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-navy">Your choices</h2>
            <p className="mt-2">
              You may update your profile or ask us to access, correct, or delete your account data,
              subject to record-retention obligations for completed transactions.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-navy">Contact</h2>
            <p className="mt-2">
              For privacy requests, email{" "}
              <a
                className="font-bold text-primary hover:underline"
                href={`mailto:${brand.supportEmail}`}
              >
                {brand.supportEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </PublicPage>
  );
}
