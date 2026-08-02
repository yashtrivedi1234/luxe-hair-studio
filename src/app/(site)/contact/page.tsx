import { SITE, whatsappLink } from "@/lib/site";
import { createMetadata, faqJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/button";

export const metadata = createMetadata({
  title: "Contact LuxeSalon Lucknow",
  description: `Visit ${SITE.address.street}, Gomti Nagar Lucknow. Call ${SITE.phoneDisplay} or WhatsApp to book.`,
  path: "/contact",
});

const faqs = [
  {
    q: "What are your timings?",
    a: "Mon–Sat 10:00 AM–8:00 PM, Sunday 11:00 AM–6:00 PM.",
  },
  {
    q: "Is parking available?",
    a: "Yes — visitor parking near Twin Tower Plaza, Vibhuti Khand, Gomti Nagar.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <section className="pb-20 pt-8">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">Contact Us</h1>
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                <strong className="text-foreground">Address:</strong>
                <br />
                {SITE.address.street}
                <br />
                {SITE.address.area}, {SITE.address.city} {SITE.address.postalCode}
              </p>
              <p>
                <strong className="text-foreground">Phone:</strong>{" "}
                <a className="text-primary" href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
              </p>
              <p>
                <strong className="text-foreground">Email:</strong>{" "}
                <a className="text-primary" href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mb-10">
              <Button variant="hero" asChild>
                <a href={whatsappLink()}>WhatsApp</a>
              </Button>
              <Button variant="outline" asChild>
                <a href={`tel:${SITE.phone}`}>Call now</a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${SITE.geo.latitude},${SITE.geo.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Maps
                </a>
              </Button>
            </div>
            <iframe
              title="LuxeSalon Lucknow map"
              className="w-full h-64 rounded-xl border grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${SITE.geo.latitude},${SITE.geo.longitude}&z=15&output=embed`}
            />
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-soft h-fit">
            <h2 className="font-display text-2xl font-semibold mb-4">Send a message</h2>
            <LeadForm source="CONTACT" />
          </div>
        </div>
      </section>
    </>
  );
}
