import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatInr } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = createMetadata({
  title: "Hair Services & Pricing Lucknow",
  description:
    "Haircuts, balayage, keratin, bridal makeup & spa at LuxeSalon Gomti Nagar Lucknow. Transparent INR pricing.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: [{ category: "asc" }, { priceInr: "asc" }],
  });
  const categories = [...new Set(services.map((s) => s.category))];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <div className="bg-gradient-hero border-b border-border/40">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />
        <div className="container mx-auto px-4 pb-14 pt-4 text-center">
          <Reveal>
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">Menu</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Hair Services in <span className="text-gradient-gold italic">Lucknow</span>
            </h1>
            <div className="gold-line mb-4" />
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Premium salon services in Gomti Nagar with clear INR rates.
            </p>
          </Reveal>
        </div>
      </div>

      <section className="pb-24 pt-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {categories.map((cat, ci) => (
            <Reveal key={cat} delay={ci * 60} className="mb-14">
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-gold" />
                {cat}
              </h2>
              <div className="space-y-3">
                {services
                  .filter((s) => s.category === cat)
                  .map((s) => (
                    <div
                      key={s.id}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/80 px-5 py-5 shadow-soft hover:border-gold/40 hover:shadow-card transition-all duration-300"
                    >
                      <div className="min-w-0">
                        <Link
                          href={`/services/${s.slug}`}
                          className="font-display text-xl font-semibold hover:text-primary transition-colors"
                        >
                          {s.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{s.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">{s.durationMin} min</p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                        <p className="font-semibold text-primary text-lg">{formatInr(s.priceInr)}</p>
                        <Button size="sm" className="rounded-full" asChild>
                          <Link href="/book">Book</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
