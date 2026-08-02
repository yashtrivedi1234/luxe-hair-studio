import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = createMetadata({
  title: "About LuxeSalon Lucknow",
  description:
    "Meet the stylists behind LuxeSalon Gomti Nagar — premium hair & bridal beauty since 2018.",
  path: "/about",
});

export default async function AboutPage() {
  const stylists = await prisma.stylist.findMany({ where: { active: true } });

  return (
    <>
      <div className="bg-gradient-hero border-b border-border/40">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
        <div className="container mx-auto px-4 pb-12 pt-4 text-center max-w-3xl">
          <Reveal>
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">Our story</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Crafted for <span className="text-gradient-gold italic">Lucknow</span>
            </h1>
            <div className="gold-line mb-4" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Founded in {SITE.foundingYear}, LuxeSalon brings metro-grade hair colour, grooming and
              bridal artistry to Gomti Nagar — with warm Awadhi hospitality.
            </p>
          </Reveal>
        </div>
      </div>

      <section className="pb-24 pt-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal>
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-16 shadow-card">
              <Image
                src="/images/founder.jpg"
                alt="LuxeSalon Lucknow founder"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 960px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
            </div>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10 text-center">
              Our Artists
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10">
            {stylists.map((s, i) => (
              <Reveal key={s.id} delay={i * 100} className="text-center group">
                <div className="relative w-44 h-44 mx-auto rounded-full overflow-hidden mb-5 ring-2 ring-gold/30 ring-offset-4 ring-offset-background shadow-gold transition-transform duration-500 group-hover:scale-[1.03]">
                  <Image
                    src={s.imageUrl || "/images/gallery-1.jpg"}
                    alt={s.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold">{s.name}</h3>
                <p className="text-primary text-sm mb-2 tracking-wide">{s.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed px-2">{s.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
