import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Gift } from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import MagneticButton from "@/components/animations/MagneticButton";

const CTASection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const decorativeX1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const decorativeX2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const decorativeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <section
      ref={sectionRef}
      id="cta"
      data-section="cta"
      data-section-label="Book Now"
      className="section-padding bg-gradient-dark text-cream overflow-hidden relative"
    >
      {/* Decorative Elements with Parallax */}
      <motion.div
        style={{ x: decorativeX1, scale: decorativeScale }}
        className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ x: decorativeX2, scale: decorativeScale }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Booking CTA */}
          <AnimatedSection direction="left">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-cream/10 rounded-full px-4 py-2 mb-6"
              >
                <Calendar className="w-4 h-4 text-gold" />
                <span className="text-sm">Book Your Experience</span>
              </motion.div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
                Ready for Your
                <br />
                <span className="text-gold italic">Transformation?</span>
              </h2>
              <p className="text-cream/70 text-lg mb-8 max-w-lg">
                Book your appointment today and let our expert stylists create your
                perfect look. New clients receive 20% off their first visit.
              </p>
              <MagneticButton>
                <Button variant="hero" size="xl" asChild>
                  <Link to="/book">Book Appointment</Link>
                </Button>
              </MagneticButton>
            </div>
          </AnimatedSection>

          {/* Right - Special Offer */}
          <AnimatedSection direction="right" delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-cream/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-cream/10"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-2 mb-6"
              >
                <Gift className="w-4 h-4 text-gold" />
                <span className="text-sm text-gold font-medium">Special Offer</span>
              </motion.div>
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
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.5 }}
                      className="w-2 h-2 rounded-full bg-gold"
                    />
                    <span className="text-cream/80">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <MagneticButton>
                <Button
                  variant="heroOutline"
                  size="lg"
                  asChild
                  className="border-gold text-gold hover:bg-gold hover:text-charcoal"
                >
                  <Link to="/offers">View All Offers</Link>
                </Button>
              </MagneticButton>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
