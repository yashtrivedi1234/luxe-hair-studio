import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: `Terms for using ${SITE.legalName} website and booking services.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms", href: "/terms" }]} />
      <article className="pb-20 pt-8 container mx-auto px-4 max-w-3xl prose">
        <h1 className="font-display text-4xl font-semibold">Terms of Service</h1>
        <p>Last updated: August 2026</p>
        <p>
          Booking requests are confirmed by our team. Please give 24 hours’ notice to cancel or
          reschedule. Please give 24 hours’ notice for cancellations. Contact {SITE.email} for questions.
        </p>
      </article>
    </>
  );
}
