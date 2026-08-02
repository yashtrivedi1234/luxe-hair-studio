import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `How ${SITE.legalName} handles your personal data.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy", href: "/privacy" }]} />
      <article className="pb-20 pt-8 container mx-auto px-4 max-w-3xl prose">
        <h1 className="font-display text-4xl font-semibold">Privacy Policy</h1>
        <p>Last updated: August 2026</p>
        <p>
          {SITE.legalName} collects name, phone, and email when you book or enquire so we can
          confirm appointments and respond to leads. We do not sell your data. Contact{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> for privacy requests.
        </p>
      </article>
    </>
  );
}
