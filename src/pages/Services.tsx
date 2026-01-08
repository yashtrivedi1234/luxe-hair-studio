import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Scissors, Palette, Sparkles, Crown, Baby, UserCheck } from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggerContainer, { staggerItemVariants } from "@/components/animations/StaggerContainer";
import MagneticButton from "@/components/animations/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

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
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate service cards on scroll
      gsap.utils.toArray(".service-card").forEach((card: any, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="pt-32 pb-16 bg-gradient-hero"
      >
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
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
            <MagneticButton>
              <Button variant="hero" size="xl" asChild>
                <Link to="/book">Book Your Service</Link>
              </Button>
            </MagneticButton>
          </AnimatedSection>
        </div>
      </motion.section>

      {/* Services Categories */}
      {serviceCategories.map((category, categoryIndex) => (
        <section
          key={category.id}
          id={category.id}
          className={`section-padding ${categoryIndex % 2 === 0 ? "bg-background" : "bg-secondary/30"} overflow-hidden`}
        >
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Category Info */}
              <AnimatedSection direction="left" className="lg:sticky lg:top-32 lg:self-start">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6"
                >
                  <category.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h2 className="font-display text-3xl font-semibold mb-4">{category.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{category.description}</p>
              </AnimatedSection>

              {/* Services List */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {category.services.map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 8, transition: { duration: 0.2 } }}
                      className="service-card flex items-center justify-between p-6 bg-card rounded-xl border border-border/50"
                    >
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <p className="text-muted-foreground text-sm">{service.duration}</p>
                      </div>
                      <div className="text-right">
                        <motion.p
                          initial={{ scale: 0.8 }}
                          whileInView={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          viewport={{ once: true }}
                          className="font-display text-xl font-semibold text-primary"
                        >
                          {service.price}
                        </motion.p>
                        <Button variant="ghost" size="sm" asChild className="mt-1">
                          <Link to="/book">Book</Link>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Additional Services */}
      <section className="section-padding bg-charcoal text-cream overflow-hidden">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Premium Add-Ons
            </span>
            <h2 className="font-display text-4xl font-semibold mt-4">
              Enhance Your Experience
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" staggerDelay={0.2}>
            {additionalServices.map((service) => (
              <motion.div
                key={service.title}
                variants={staggerItemVariants}
                whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.3)" }}
                className="flex items-center gap-6 p-8 rounded-xl bg-cream/5 border border-cream/10 transition-colors"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center shrink-0"
                >
                  <service.icon className="w-7 h-7 text-gold" />
                </motion.div>
                <div>
                  <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                  <p className="text-cream/70">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>

          <AnimatedSection className="text-center mt-12" delay={0.4}>
            <p className="text-cream/60 mb-4">Not sure which service is right for you?</p>
            <MagneticButton>
              <Button variant="heroOutline" size="lg" asChild className="border-gold text-gold hover:bg-gold hover:text-charcoal">
                <Link to="/book">Book a Free Consultation</Link>
              </Button>
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
