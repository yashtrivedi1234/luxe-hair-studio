import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Layout from "@/components/layout/Layout";
import { Award, Heart, Sparkles, Users } from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggerContainer, { staggerItemVariants } from "@/components/animations/StaggerContainer";
import ParallaxImage from "@/components/animations/ParallaxImage";
import founderImage from "@/assets/founder.jpg";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Heart,
    title: "Passion for Beauty",
    description: "We believe in the transformative power of a great hairstyle to boost confidence and self-expression.",
  },
  {
    icon: Sparkles,
    title: "Excellence in Craft",
    description: "Our stylists continuously train with industry leaders to master the latest techniques and trends.",
  },
  {
    icon: Users,
    title: "Client-Centered Care",
    description: "Every client receives personalized attention and a customized approach to their unique needs.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "We exclusively use luxury hair care products that deliver exceptional results and hair health.",
  },
];

const team = [
  {
    name: "Isabella Martinez",
    role: "Founder & Creative Director",
    image: founderImage,
    bio: "With 20+ years in the industry, Isabella founded LuxeSalon to create a sanctuary where beauty meets artistry.",
  },
  {
    name: "David Thompson",
    role: "Senior Colorist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    bio: "Award-winning colorist specializing in balayage and creative color transformations.",
  },
  {
    name: "Sophie Williams",
    role: "Bridal Specialist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    bio: "Expert in creating timeless bridal looks that make every bride feel like royalty.",
  },
  {
    name: "Marcus Lee",
    role: "Men's Styling Expert",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    bio: "Master barber bringing precision and style to modern men's grooming.",
  },
];

const About = () => {
  const heroRef = useRef(null);
  const counterRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation
      gsap.fromTo(
        ".about-counter",
        { textContent: 0 },
        {
          textContent: (i, target) => target.getAttribute("data-value"),
          duration: 2,
          snap: { textContent: 1 },
          ease: "power2.out",
          scrollTrigger: {
            trigger: counterRef.current,
            start: "top 80%",
          },
        }
      );
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
              Our Story
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold mt-4 mb-6">
              Where Passion Meets
              <span className="text-gradient-gold italic"> Expertise</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Founded in 2009, LuxeSalon has grown from a small boutique studio to Beverly Hills'
              premier destination for luxury hair care. Our mission is simple: to help every
              client discover their most confident, beautiful self.
            </p>
          </AnimatedSection>
        </div>
      </motion.section>

      {/* Story Section */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left" className="relative">
              <ParallaxImage
                src={founderImage}
                alt="Isabella Martinez - Founder"
                className="rounded-2xl shadow-card w-full aspect-[4/5]"
              />
              <motion.div
                ref={counterRef}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-6 bg-card rounded-xl p-6 shadow-soft border border-border"
              >
                <p className="font-display text-4xl font-semibold text-primary">
                  <span className="about-counter" data-value="15">0</span>+
                </p>
                <p className="text-muted-foreground text-sm">Years of Excellence</p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <span className="text-primary text-sm font-medium tracking-widest uppercase">
                Our Beginning
              </span>
              <h2 className="font-display text-4xl font-semibold mt-4 mb-6">
                A Vision of Elegance
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  LuxeSalon was born from Isabella Martinez's dream to create more than just a
                  salon—a sanctuary where clients could escape the everyday and emerge transformed.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  After training at prestigious academies in Paris and Milan, Isabella brought her
                  expertise back to Beverly Hills with a clear vision: combine European sophistication
                  with California's relaxed luxury.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Today, our team of 50+ expert stylists continues this legacy, delivering personalized
                  experiences that have earned us numerous industry awards and the loyalty of thousands
                  of clients.
                </motion.p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-secondary/30 overflow-hidden">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              What Drives Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4">
              Our Core Values
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.15}>
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={staggerItemVariants}
                whileHover={{ y: -8 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
                >
                  <value.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-display text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Meet The Team
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 mb-6">
              Our Expert
              <span className="text-gradient-gold italic"> Stylists</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Each member of our team brings unique expertise and a shared passion for creating beautiful transformations.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.1}>
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={staggerItemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="aspect-[4/5] rounded-xl overflow-hidden mb-4"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <h3 className="font-display text-lg font-semibold">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Awards Section */}
      <section className="section-padding bg-charcoal text-cream overflow-hidden">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Recognition
            </span>
            <h2 className="font-display text-4xl font-semibold mt-4">
              Awards & Certifications
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" staggerDelay={0.1}>
            {[
              { year: "2024", award: "Best Luxury Salon - LA Weekly" },
              { year: "2023", award: "Top 10 Colorists - Allure Magazine" },
              { year: "2022", award: "Excellence in Bridal Styling" },
              { year: "2021", award: "Sustainable Salon Award" },
            ].map((item) => (
              <motion.div
                key={item.year}
                variants={staggerItemVariants}
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
                className="p-6 rounded-xl bg-cream/5 border border-cream/10 transition-colors"
              >
                <p className="text-gold text-2xl font-display font-semibold mb-2">{item.year}</p>
                <p className="text-cream/70 text-sm">{item.award}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </Layout>
  );
};

export default About;
