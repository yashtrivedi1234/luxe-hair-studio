import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatInr, SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/LeadForm";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await prisma.service.findMany({ select: { slug: true } });
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = await prisma.service.findUnique({ where: { slug } });
  if (!s) return {};
  return createMetadata({
    title: s.seoTitle || `${s.name} in Lucknow`,
    description: s.seoDesc || s.description,
    path: `/services/${s.slug}`,
  });
}

export default async function ServiceLandingPage({ params }: Props) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: { "@id": `${SITE.url}/#salon` },
    areaServed: "Lucknow",
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: service.priceInr,
    },
  };

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
      />
      <section className="pb-20 pt-8">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-primary text-sm tracking-widest uppercase mb-2">{service.category} · Lucknow</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">{service.name}</h1>
            <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
            <p className="text-3xl font-display font-semibold text-primary mb-2">{formatInr(service.priceInr)}</p>
            <p className="text-sm text-muted-foreground mb-8">{service.durationMin} minutes · Gomti Nagar studio</p>
            <Button variant="hero" size="lg" asChild>
              <Link href="/book">Book this service</Link>
            </Button>
            <div className="mt-10 prose prose-neutral">
              <h2 className="font-display text-2xl">Why book in Lucknow?</h2>
              <p>
                Clients from {SITE.address.area}, Hazratganj and Indira Nagar choose LuxeSalon for
                reliable slots, hygiene, and bridal-ready finishing. Ask about packages on WhatsApp.
              </p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold mb-4">Quick enquiry</h2>
            <LeadForm source="SERVICE_LANDING" interest={service.name} />
          </div>
        </div>
      </section>
    </>
  );
}
