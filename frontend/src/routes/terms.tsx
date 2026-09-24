import { createFileRoute } from "@tanstack/react-router";
import { PublicPage } from "@/components/app-shell";
import { brand } from "@/config/brand";

export const Route = createFileRoute("/terms")({ component: TermsPage });
function TermsPage() {
  return (
    <PublicPage>
      <article className="container-page max-w-3xl py-16">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">Legal</p>
        <h1 className="mt-2 text-4xl font-extrabold text-navy">Terms of Use</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated 24 September 2026</p>
        <div className="mt-9 space-y-7 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="text-xl font-extrabold text-navy">Accounts</h2>
            <p className="mt-2">
              Provide accurate information, keep your credentials confidential, and notify us
              promptly if you believe your account has been compromised. Accounts and course access
              may not be shared.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-navy">Purchases and access</h2>
            <p className="mt-2">
              Course purchases use InstaPay. Access begins only after an administrator verifies the
              transfer. Each course shows its fixed access-closing date before purchase; that date
              applies regardless of when you enroll.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-navy">Educational use</h2>
            <p className="mt-2">
              Materials are for individual supplementary study. They do not replace university
              instruction, clinical supervision, professional judgment, or accredited
              qualifications. Copying, reselling, or redistributing course materials is prohibited.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-navy">Acceptable use</h2>
            <p className="mt-2">
              Do not attempt to bypass access controls, interfere with the service, automate abusive
              traffic, or upload unlawful content. We may suspend access when necessary to protect
              students or the platform.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-navy">Support</h2>
            <p className="mt-2">
              Questions about these terms can be sent to{" "}
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
