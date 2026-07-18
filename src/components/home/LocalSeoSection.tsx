import { Link } from "react-router-dom";
import { MapPin, Scissors, Sparkles, Users } from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { SITE } from "@/lib/site";

const points = [
  {
    icon: MapPin,
    title: "Prime Beverly Hills Location",
    text: `Visit us at ${SITE.address.street} for luxury hair care near Rodeo Drive and the 90210 area.`,
  },
  {
    icon: Scissors,
    title: "Expert Cuts & Color",
    text: "Precision haircuts, balayage, highlights, and color correction by experienced Beverly Hills stylists.",
  },
  {
    icon: Sparkles,
    title: "Treatments & Bridal Styling",
    text: "Keratin, Olaplex, spa treatments, and bridal hair for weddings and special occasions.",
  },
  {
    icon: Users,
    title: "Trusted Local Salon",
    text: "Rated highly by clients across Beverly Hills, West Hollywood, and Greater Los Angeles.",
  },
];

/** Crawlable local SEO content below the fold — one purpose: why choose this salon locally. */
const LocalSeoSection = () => {
  return (
    <section
      id="beverly-hills-salon"
      aria-labelledby="local-seo-heading"
      className="section-padding bg-secondary/30"
    >
      <div className="container-custom">
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">
            Beverly Hills Hair Salon
          </span>
          <h2 id="local-seo-heading" className="font-display text-4xl md:text-5xl font-semibold mt-4 mb-6">
            Your Luxury Hair Salon in
            <span className="text-gradient-gold italic"> Beverly Hills</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Looking for a premium hair salon in Beverly Hills? LuxeSalon offers women’s and men’s
            haircuts, balayage, color, keratin treatments, and bridal styling in a calm, high-end
            studio. Book online or call {SITE.phoneDisplay} — open Mon–Fri 9AM–8PM and Sat–Sun
            10AM–6PM.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
          {points.map((item) => (
            <AnimatedSection key={item.title}>
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-gold flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/services" className="text-primary underline underline-offset-4 hover:opacity-80">
              View all services
            </Link>
            <Link to="/book" className="text-primary underline underline-offset-4 hover:opacity-80">
              Book an appointment
            </Link>
            <Link to="/contact" className="text-primary underline underline-offset-4 hover:opacity-80">
              Get directions
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LocalSeoSection;
