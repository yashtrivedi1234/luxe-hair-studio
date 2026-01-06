import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-salon.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxe Salon Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-2xl">
          {/* Rating Badge */}
          <div className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-up">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-cream text-sm">500+ Happy Clients</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-cream leading-tight mb-6 animate-fade-up delay-100">
            Where{" "}
            <span className="text-gradient-gold italic">Luxury</span>
            <br />
            Meets Artistry
          </h1>

          {/* Subheadline */}
          <p className="text-cream/80 text-lg md:text-xl leading-relaxed mb-8 animate-fade-up delay-200">
            Experience premium hair styling at Beverly Hills' most exclusive salon.
            Transform your look with our award-winning stylists.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
            <Button variant="hero" size="xl" asChild>
              <Link to="/book" className="gap-2">
                Book Appointment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild className="border-cream/30 text-cream hover:bg-cream hover:text-charcoal">
              <Link to="/services">View Services</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-cream/20 animate-fade-up delay-400">
            {[
              { number: "15+", label: "Years Experience" },
              { number: "50+", label: "Expert Stylists" },
              { number: "10K+", label: "Happy Clients" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl md:text-4xl font-semibold text-gold">
                  {stat.number}
                </p>
                <p className="text-cream/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-cream rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
