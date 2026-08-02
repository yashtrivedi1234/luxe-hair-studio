import { prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BookingForm } from "@/components/booking/BookingForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = createMetadata({
  title: "Book Appointment",
  description:
    "Book haircut, balayage, keratin or bridal services at LuxeSalon Gomti Nagar, Lucknow. Online slots + WhatsApp confirm.",
  path: "/book",
});

export default async function BookPage() {
  const [services, stylists] = await Promise.all([
    prisma.service.findMany({ where: { active: true }, orderBy: { category: "asc" } }),
    prisma.stylist.findMany({ where: { active: true } }),
  ]);

  return (
    <>
      <div className="bg-gradient-hero border-b border-border/40">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Book", href: "/book" }]} />
        <div className="container mx-auto px-4 pb-12 pt-4 text-center">
          <Reveal>
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">Reservations</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">Book Your Visit</h1>
            <div className="gold-line mb-4" />
            <p className="text-muted-foreground max-w-lg mx-auto">
              Choose a service, artist & slot. Optional Razorpay advance for priority confirmation.
            </p>
          </Reveal>
        </div>
      </div>
      <section className="pb-24 pt-10">
        <div className="container mx-auto px-4 max-w-xl">
          <Reveal>
            <BookingForm
              services={services.map((s) => ({
                id: s.id,
                name: s.name,
                priceInr: s.priceInr,
                durationMin: s.durationMin,
              }))}
              stylists={stylists.map((s) => ({ id: s.id, name: s.name, title: s.title }))}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
