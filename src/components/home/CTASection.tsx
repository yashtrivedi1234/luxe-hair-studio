import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Gift } from "lucide-react";

const CTASection = () => {
  return (
    <section className="section-padding bg-gradient-dark text-cream overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Booking CTA */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-cream/10 rounded-full px-4 py-2 mb-6">
              <Calendar className="w-4 h-4 text-gold" />
              <span className="text-sm">Book Your Experience</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Ready for Your
              <br />
              <span className="text-gold italic">Transformation?</span>
            </h2>
            <p className="text-cream/70 text-lg mb-8 max-w-lg">
              Book your appointment today and let our expert stylists create your
              perfect look. New clients receive 20% off their first visit.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/book">Book Appointment</Link>
            </Button>
          </div>

          {/* Right - Special Offer */}
          <div className="bg-cream/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-cream/10">
            <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-2 mb-6">
              <Gift className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold font-medium">Special Offer</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              First-Time Client Offer
            </h3>
            <p className="text-cream/70 mb-6">
              Experience the LuxeSalon difference with our exclusive welcome package:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "20% off your first service",
                "Complimentary hair consultation",
                "Premium product sample kit",
                "Loyalty program enrollment",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span className="text-cream/80">{item}</span>
                </li>
              ))}
            </ul>
            <Button variant="heroOutline" size="lg" asChild className="border-gold text-gold hover:bg-gold hover:text-charcoal">
              <Link to="/offers">View All Offers</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
