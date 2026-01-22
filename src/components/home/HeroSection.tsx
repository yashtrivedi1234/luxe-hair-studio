import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import MagneticButton from "@/components/animations/MagneticButton";
import heroImage from "@/assets/hero-salon.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { scrollY } = useScroll();
  
  const backgroundY = useTransform(scrollY, [0, 800], [0, 300]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.5, 0.8]);
  const contentY = useTransform(scrollY, [0, 500], [0, 100]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline character animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word");
        gsap.fromTo(
          words,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.1,
            duration: 1,
            delay: 0.5,
            ease: "power4.out",
          }
        );
      }

      // Stats counter animation
      gsap.fromTo(
        ".stat-number",
        { textContent: 0 },
        {
          textContent: (i, target) => target.getAttribute("data-value"),
          duration: 2,
          delay: 1.2,
          snap: { textContent: 1 },
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" data-section="hero" data-section-label="Hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <img
          src={heroImage}
          alt="Luxe Salon Interior"
          className="w-full h-[120%] object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {/* Content with Parallax */}
      <motion.div
        className="container-custom relative z-10 pt-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-2xl">
          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Star className="w-4 h-4 fill-gold text-gold" />
                </motion.div>
              ))}
            </div>
            <span className="text-cream text-sm">500+ Happy Clients</span>
          </motion.div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-cream leading-tight mb-6"
            style={{ perspective: "1000px" }}
          >
            <span className="word inline-block overflow-hidden">
              <span className="inline-block">Where</span>
            </span>{" "}
            <span className="word inline-block overflow-hidden">
              <span className="inline-block text-gradient-gold italic">Luxury</span>
            </span>
            <br />
            <span className="word inline-block overflow-hidden">
              <span className="inline-block">Meets</span>
            </span>{" "}
            <span className="word inline-block overflow-hidden">
              <span className="inline-block">Artistry</span>
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-cream/80 text-lg md:text-xl leading-relaxed mb-8"
          >
            Experience premium hair styling at Beverly Hills' most exclusive salon.
            Transform your look with our award-winning stylists.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton>
              <Button variant="hero" size="xl" asChild>
                <Link to="/book" className="gap-2">
                  Book Appointment
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                variant="heroOutline"
                size="xl"
                asChild
                
                className="border-cream/30 text-cream hover:bg-cream hover:text-charcoal"
              >
                <Link to="/services">View Services</Link>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-cream/20"
          >
            {[
              { number: "15", suffix: "+", label: "Years Experience" },
              { number: "50", suffix: "+", label: "Expert Stylists" },
              { number: "10", suffix: "K+", label: "Happy Clients" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl md:text-4xl font-semibold text-gold">
                  <span className="stat-number" data-value={stat.number}>
                    0
                  </span>
                  {stat.suffix}
                </p>
                <p className="text-cream/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-cream rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
