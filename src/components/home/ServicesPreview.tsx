import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Scissors, Palette, Sparkles, Crown, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggerContainer, { staggerItemVariants } from "@/components/animations/StaggerContainer";
import MagneticButton from "@/components/animations/MagneticButton";

const services = [
  {
    icon: Scissors,
    title: "Precision Haircuts",
    description: "Expert cuts tailored to your face shape and lifestyle",
    price: "From $75",
  },
  {
    icon: Palette,
    title: "Color & Highlights",
    description: "Stunning color transformations using premium products",
    price: "From $120",
  },
  {
    icon: Sparkles,
    title: "Hair Spa & Treatments",
    description: "Rejuvenating treatments for healthy, lustrous hair",
    price: "From $95",
  },
  {
    icon: Crown,
    title: "Bridal Styling",
    description: "Unforgettable looks for your special day",
    price: "From $250",
  },
];

const ServicesPreview = () => {
  return (
    <section id="services" data-section="services" data-section-label="Services" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 mb-6">
            Tailored Beauty
            <span className="text-gradient-gold italic"> Experiences</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From classic cuts to bold transformations, our expert stylists deliver
            personalized services that exceed expectations.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={0.15}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={staggerItemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-card rounded-xl p-8 border border-border/50 cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300"
              >
                <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </motion.div>
              <h3 className="font-display text-xl font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {service.description}
              </p>
              <p className="text-primary font-semibold">{service.price}</p>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <AnimatedSection className="text-center mt-12" delay={0.4}>
          <MagneticButton>
            <Button variant="default" size="lg" asChild>
              <Link to="/services" className="gap-2">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </MagneticButton>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ServicesPreview;
