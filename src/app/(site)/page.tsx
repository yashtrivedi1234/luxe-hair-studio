import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, formatInr, whatsappLink } from "@/lib/site";
import { prisma } from "@/lib/prisma";
import { faqJsonLd, hairSalonJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/seo";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = createMetadata({
  title: `${SITE.name} | Premium Hair Salon Gomti Nagar Lucknow`,
  description:
    "Best hair salon in Gomti Nagar, Lucknow. Haircuts, balayage, keratin & bridal makeup. Book online or WhatsApp — LuxeSalon Lucknow.",
  path: "/",
});

const faqs = [
  {
    q: "Where is LuxeSalon located in Lucknow?",
    a: `We are at ${SITE.address.street}, ${SITE.address.area}, Lucknow ${SITE.address.postalCode}.`,
  },
  {
    q: "How do I book an appointment?",
    a: "Book online on our Book page, call us, or WhatsApp — we confirm slots quickly.",
  },
  {
    q: "Do you offer bridal makeup in Lucknow?",
    a: "Yes — bridal hair & makeup trials and wedding-day packages are available for Lucknow weddings.",
  },
];

const serviceImages = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/hero-salon.jpg",
];

export default async function HomePage() {
  const [services, reviews, gallery] = await Promise.all([
    prisma.service.findMany({ where: { featured: true, active: true }, take: 4, orderBy: { priceInr: "asc" } }),
    prisma.review.findMany({ where: { approved: true }, take: 3, orderBy: { createdAt: "desc" } }),
    prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" }, take: 4 }),
  ]);

  return (
    <>
      <JsonLd
        data={[
          hairSalonJsonLd({ ratingValue: "4.8", reviewCount: String(reviews.length || 4) }),
          faqJsonLd(faqs),
        ]}
      />

      {/* Full-bleed hero — brand first */}
      <section className="relative min-h-[100svh] flex items-end md:items-center overflow-hidden">
        <Image
          src="/images/hero-salon.jpg"
          alt="LuxeSalon Lucknow salon interior in Gomti Nagar"
          fill
          priority
          className="object-cover hero-kenburns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/25 md:bg-gradient-to-r md:from-charcoal/90 md:via-charcoal/50 md:to-transparent" />
        <div className="absolute inset-0 surface-noise opacity-40 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 pt-28 pb-16 md:pb-24">
          <div className="max-w-xl text-cream animate-fade-up">
            <p className="flex items-center gap-2 text-[11px] md:text-xs tracking-[0.28em] uppercase text-gold mb-5">
              <MapPin className="w-3.5 h-3.5" />
              Gomti Nagar · Lucknow
            </p>
            <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-7xl font-semibold leading-[1.05] mb-6">
              LuxeSalon
              <span className="block text-gradient-gold italic font-medium mt-1">Lucknow</span>
            </h1>
            <p className="text-cream/80 text-base md:text-lg leading-relaxed mb-9 max-w-md">
              Hair, colour & bridal artistry — crafted for Awadhi celebrations and everyday elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button variant="hero" size="xl" className="rounded-full" asChild>
                <Link href="/book" className="gap-2">
                  Book Appointment <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="rounded-full border-cream/35 text-cream bg-cream/5 backdrop-blur-sm hover:bg-cream hover:text-charcoal"
                asChild
              >
                <a href={whatsappLink()}>WhatsApp</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-cream/50 text-[10px] tracking-[0.3em] uppercase animate-float">
          <span>Scroll</span>
          <span className="w-px h-8 bg-gradient-to-b from-gold/80 to-transparent" />
        </div>
      </section>

      {/* Services — image tiles */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="container-custom">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-3">Signature menu</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Crafted in <span className="text-gradient-gold italic">Lucknow</span>
            </h2>
            <div className="gold-line mb-4" />
            <p className="text-muted-foreground">Transparent INR pricing. Artists who understand Indian hair & bridal looks.</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 90}>
                <Link href={`/services/${s.slug}`} className="service-tile group block shadow-card">
                  <Image
                    src={serviceImages[i % serviceImages.length]}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width:768px) 100vw, 25vw"
                  />
                  <div className="service-tile-overlay group-hover:opacity-95" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-cream z-10">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-1">{s.category}</p>
                    <h3 className="font-display text-xl font-semibold mb-2 leading-snug">{s.name}</h3>
                    <p className="text-gold font-semibold">{formatInr(s.priceInr)}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Button variant="outline" className="rounded-full px-8" asChild>
              <Link href="/services" className="gap-2">
                View full menu <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Atmosphere + local */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <Image src="/images/gallery-1.jpg" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-charcoal/75" />
        <div className="container-custom relative z-10 py-20 text-cream">
          <Reveal className="max-w-2xl">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Gomti Nagar studio
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6 leading-tight">
              Where Lucknow meets{" "}
              <span className="text-gradient-gold italic">luxury</span>
            </h2>
            <p className="text-cream/75 text-lg leading-relaxed mb-8 max-w-lg">
              From Hazratganj evenings to Indira Nagar weekends — a calm, premium space for cuts,
              balayage, keratin and bridal trials.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/contact" className="text-gold hover:text-cream transition-colors underline underline-offset-4">
                Get directions
              </Link>
              <Link href="/offers" className="text-gold hover:text-cream transition-colors underline underline-offset-4">
                Current offers
              </Link>
              <Link href="/about" className="text-gold hover:text-cream transition-colors underline underline-offset-4">
                Meet the artists
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="py-4 bg-background">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 px-2 md:px-3">
          {(gallery.length ? gallery : [{ id: "1", imageUrl: "/images/gallery-1.jpg", title: "Colour", category: "Color" }]).map((item, i) => (
            <Reveal key={item.id} delay={i * 60}>
              <Link href="/gallery" className="relative aspect-[3/4] overflow-hidden rounded-xl group block">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding bg-secondary/35">
        <div className="container-custom">
          <Reveal className="text-center mb-12">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">Testimonials</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold">
              Loved in <span className="text-gradient-gold italic">Lucknow</span>
            </h2>
            <div className="gold-line mt-5" />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 100}>
                <blockquote className="h-full rounded-2xl bg-card/80 backdrop-blur border border-border/60 p-8 shadow-soft">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="font-display text-lg text-foreground/85 italic leading-relaxed mb-6">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <footer className="text-sm font-semibold tracking-wide">{r.name}</footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-padding overflow-hidden bg-charcoal text-cream">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-charcoal-light opacity-90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 blur-3xl rounded-full pointer-events-none" />
        <Reveal className="container-custom relative z-10 text-center max-w-2xl">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">Your next look starts here</h2>
          <p className="text-cream/65 mb-9 text-lg">Book in under a minute — or message us on WhatsApp.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="rounded-full" asChild>
              <Link href="/book">Book Now</Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="rounded-full border-cream/30 text-cream hover:bg-cream hover:text-charcoal"
              asChild
            >
              <a href={whatsappLink("Hi! I want a callback from LuxeSalon Lucknow.")}>Request callback</a>
            </Button>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="section-padding" aria-labelledby="faq-heading">
        <div className="container-custom max-w-3xl">
          <Reveal>
            <h2 id="faq-heading" className="font-display text-3xl md:text-4xl font-semibold text-center mb-10">
              Questions, answered
            </h2>
          </Reveal>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 80}>
                <div className="rounded-2xl border bg-card/60 px-6 py-5 hover:border-gold/40 transition-colors">
                  <h3 className="font-display text-xl font-semibold mb-2">{f.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
