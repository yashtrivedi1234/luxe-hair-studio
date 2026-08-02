import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata = createMetadata({
  title: "Offers & Packages Lucknow",
  description: "Salon offers, bridal packages and coupon codes at LuxeSalon Gomti Nagar.",
  path: "/offers",
});

export default async function OffersPage() {
  const offers = await prisma.offer.findMany({ where: { active: true } });

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Offers", href: "/offers" }]} />
      <section className="pb-20 pt-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-center mb-10">Offers</h1>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {offers.map((o) => (
              <div key={o.id} className="rounded-xl border bg-card p-6 shadow-soft">
                <h2 className="font-display text-2xl font-semibold mb-2">{o.title}</h2>
                <p className="text-muted-foreground text-sm mb-4">{o.description}</p>
                {o.code && (
                  <p className="text-sm mb-4">
                    Code: <span className="font-mono font-semibold text-primary">{o.code}</span>
                    {o.discountPct ? ` · ${o.discountPct}% off` : ""}
                  </p>
                )}
                <Button asChild><Link href="/book">Claim offer</Link></Button>
              </div>
            ))}
          </div>
          <div className="max-w-lg mx-auto rounded-xl border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold mb-4 text-center">Gift card / bridal quote</h2>
            <LeadForm source="OFFER" interest="Gift card or bridal package" />
          </div>
        </div>
      </section>
    </>
  );
}
