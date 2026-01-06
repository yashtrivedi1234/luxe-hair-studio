import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Scissors, Palette, Sparkles, Crown, Baby, UserCheck } from "lucide-react";

const serviceCategories = [
  {
    id: "haircuts",
    icon: Scissors,
    title: "Precision Haircuts",
    description: "Expert cuts tailored to your face shape, hair texture, and lifestyle",
    services: [
      { name: "Women's Haircut & Style", price: "$95", duration: "60 min" },
      { name: "Men's Haircut", price: "$65", duration: "45 min" },
      { name: "Kids Haircut (Under 12)", price: "$45", duration: "30 min" },
      { name: "Bang Trim", price: "$25", duration: "15 min" },
      { name: "Consultation & Styling", price: "$55", duration: "45 min" },
    ],
  },
  {
    id: "coloring",
    icon: Palette,
    title: "Hair Coloring & Highlights",
    description: "From subtle enhancements to bold transformations",
    services: [
      { name: "Full Color", price: "$150+", duration: "90 min" },
      { name: "Root Touch-Up", price: "$95", duration: "60 min" },
      { name: "Balayage / Ombré", price: "$250+", duration: "180 min" },
      { name: "Full Highlights", price: "$200+", duration: "120 min" },
      { name: "Partial Highlights", price: "$150+", duration: "90 min" },
      { name: "Color Correction", price: "Consultation", duration: "Varies" },
    ],
  },
  {
    id: "treatments",
    icon: Sparkles,
    title: "Hair Spa & Treatments",
    description: "Rejuvenating treatments for healthy, lustrous hair",
    services: [
      { name: "Deep Conditioning Treatment", price: "$55", duration: "30 min" },
      { name: "Keratin Smoothing", price: "$350+", duration: "180 min" },
      { name: "Scalp Therapy", price: "$75", duration: "45 min" },
      { name: "Olaplex Treatment", price: "$95", duration: "45 min" },
      { name: "Hair Botox", price: "$200+", duration: "120 min" },
    ],
  },
  {
    id: "bridal",
    icon: Crown,
    title: "Bridal & Special Occasion",
    description: "Unforgettable looks for your most important moments",
    services: [
      { name: "Bridal Hair Trial", price: "$150", duration: "90 min" },
      { name: "Wedding Day Styling", price: "$300", duration: "120 min" },
      { name: "Bridesmaids Styling", price: "$120", duration: "60 min" },
      { name: "Special Occasion Updo", price: "$150", duration: "75 min" },
      { name: "Prom / Event Styling", price: "$100", duration: "60 min" },
    ],
  },
];

const additionalServices = [
  { icon: Baby, title: "Kids Services", description: "Gentle care for our youngest clients" },
  { icon: UserCheck, title: "VIP Experience", description: "Private suite with champagne service" },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Our Services
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold mt-4 mb-6">
              Premium Hair
              <span className="text-gradient-gold italic"> Services</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              From precision cuts to transformative color, our expert stylists offer a complete
              range of luxury hair services tailored to your unique style.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/book">Book Your Service</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      {serviceCategories.map((category, categoryIndex) => (
        <section
          key={category.id}
          id={category.id}
          className={`section-padding ${categoryIndex % 2 === 0 ? "bg-background" : "bg-secondary/30"}`}
        >
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Category Info */}
              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <category.icon className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display text-3xl font-semibold mb-4">{category.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{category.description}</p>
              </div>

              {/* Services List */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {category.services.map((service, index) => (
                    <div
                      key={service.name}
                      className="flex items-center justify-between p-6 bg-card rounded-xl border border-border/50 card-hover animate-fade-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <p className="text-muted-foreground text-sm">{service.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-xl font-semibold text-primary">
                          {service.price}
                        </p>
                        <Button variant="ghost" size="sm" asChild className="mt-1">
                          <Link to="/book">Book</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Additional Services */}
      <section className="section-padding bg-charcoal text-cream">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Premium Add-Ons
            </span>
            <h2 className="font-display text-4xl font-semibold mt-4">
              Enhance Your Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {additionalServices.map((service) => (
              <div
                key={service.title}
                className="flex items-center gap-6 p-8 rounded-xl bg-cream/5 border border-cream/10"
              >
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <service.icon className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                  <p className="text-cream/70">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-cream/60 mb-4">Not sure which service is right for you?</p>
            <Button variant="heroOutline" size="lg" asChild className="border-gold text-gold hover:bg-gold hover:text-charcoal">
              <Link to="/book">Book a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
