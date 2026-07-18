import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Gift, Crown, Sparkles, Clock, Tag, Star, Check } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggerContainer, { staggerItemVariants } from "@/components/animations/StaggerContainer";
import MagneticButton from "@/components/animations/MagneticButton";

const offers = [
  {
    icon: Gift,
    title: "First-Time Client Special",
    description: "20% off your first service plus a complimentary deep conditioning treatment",
    validUntil: "Ongoing",
    code: "WELCOME20",
    highlight: true,
  },
  {
    icon: Sparkles,
    title: "Summer Glow Package",
    description: "Full highlights + Olaplex treatment + Style for just $299 (Save $75)",
    validUntil: "Aug 31, 2024",
    code: "SUMMERGLOW",
  },
  {
    icon: Tag,
    title: "Refer a Friend",
    description: "Give $30, Get $30 - Both you and your friend receive $30 off",
    validUntil: "Ongoing",
    code: "FRIEND30",
  },
  {
    icon: Clock,
    title: "Happy Hour Specials",
    description: "15% off all services Mon-Wed 2-5pm",
    validUntil: "Ongoing",
    code: "HAPPYHOUR",
  },
];

const membershipTiers = [
  {
    name: "Gold",
    price: "$49",
    period: "/month",
    benefits: [
      "10% off all services",
      "Priority booking",
      "Complimentary bang trims",
      "Birthday bonus: 25% off",
    ],
    popular: false,
  },
  {
    name: "Platinum",
    price: "$99",
    period: "/month",
    benefits: [
      "20% off all services",
      "Same-day booking priority",
      "Free deep conditioning monthly",
      "Complimentary styling products",
      "Birthday bonus: 40% off",
      "Exclusive event invitations",
    ],
    popular: true,
  },
  {
    name: "Diamond",
    price: "$199",
    period: "/month",
    benefits: [
      "30% off all services",
      "VIP private suite access",
      "Unlimited styling products",
      "Personal stylist on-call",
      "Birthday bonus: 50% off",
      "Champagne service included",
      "Annual photoshoot session",
    ],
    popular: false,
  },
];

const Offers = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-8 pb-16 bg-gradient-hero">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Special Offers
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold mt-4 mb-6">
              Exclusive Deals &
              <span className="text-gradient-gold italic"> Memberships</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Enjoy special savings and VIP perks with our seasonal offers and membership programs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Current Offers */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Current Promotions
            </h2>
            <p className="text-muted-foreground">
              Take advantage of these limited-time offers
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {offers.map((offer) => (
              <motion.div
                key={offer.title}
                variants={staggerItemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`relative rounded-xl p-8 border ${
                  offer.highlight
                    ? "bg-gradient-gold text-charcoal border-primary shadow-gold"
                    : "bg-card border-border shadow-soft"
                }`}
              >
                {offer.highlight && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-3 left-6 bg-charcoal text-cream text-xs font-medium px-3 py-1 rounded-full"
                  >
                    Most Popular
                  </motion.div>
                )}
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    offer.highlight ? "bg-charcoal/20" : "bg-primary/10"
                  }`}
                >
                  <offer.icon className={`w-6 h-6 ${offer.highlight ? "text-charcoal" : "text-primary"}`} />
                </motion.div>
                <h3 className="font-display text-xl font-semibold mb-2">{offer.title}</h3>
                <p className={`mb-4 ${offer.highlight ? "text-charcoal/80" : "text-muted-foreground"}`}>
                  {offer.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className={`text-sm ${offer.highlight ? "text-charcoal/60" : "text-muted-foreground"}`}>
                    Valid: {offer.validUntil}
                  </div>
                  <motion.code 
                    whileHover={{ scale: 1.05 }}
                    className={`text-sm font-mono px-3 py-1 rounded cursor-pointer ${
                      offer.highlight ? "bg-charcoal/20" : "bg-muted"
                    }`}
                  >
                    {offer.code}
                  </motion.code>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Membership Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4"
            >
              <Crown className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">VIP Membership</span>
            </motion.div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Join the LuxeSalon Family
            </h2>
            <p className="text-muted-foreground">
              Unlock exclusive benefits and savings with our membership programs
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={staggerItemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className={`relative rounded-2xl p-8 ${
                  tier.popular
                    ? "bg-charcoal text-cream border-2 border-gold scale-105 shadow-gold"
                    : "bg-card border border-border shadow-soft"
                }`}
              >
                {tier.popular && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-gold text-charcoal text-xs font-semibold px-4 py-1.5 rounded-full"
                  >
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </motion.div>
                )}

                <h3 className={`font-display text-2xl font-semibold mb-2 ${
                  tier.popular ? "text-gold" : "text-primary"
                }`}>
                  {tier.name}
                </h3>
                
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold">{tier.price}</span>
                  <span className={tier.popular ? "text-cream/60" : "text-muted-foreground"}>
                    {tier.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, i) => (
                    <motion.li 
                      key={benefit} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <Check className={`w-5 h-5 shrink-0 mt-0.5 ${
                        tier.popular ? "text-gold" : "text-primary"
                      }`} />
                      <span className={`text-sm ${
                        tier.popular ? "text-cream/80" : "text-muted-foreground"
                      }`}>
                        {benefit}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <MagneticButton>
                  <Button
                    variant={tier.popular ? "hero" : "outline"}
                    className="w-full"
                    size="lg"
                    asChild
                  >
                    <Link to="/contact">Get Started</Link>
                  </Button>
                </MagneticButton>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Gift Cards */}
      <section className="section-padding bg-charcoal text-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <span className="text-gold text-sm font-medium tracking-widest uppercase">
                Gift Cards
              </span>
              <h2 className="font-display text-4xl font-semibold mt-4 mb-6">
                The Perfect Gift of Beauty
              </h2>
              <p className="text-cream/70 text-lg mb-6">
                Give the gift of luxury with a LuxeSalon gift card. Available in any amount
                and delivered instantly via email or as a beautiful physical card.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Available from $50 to $500",
                  "Never expires",
                  "Valid for all services and products",
                  "Beautifully designed physical cards available",
                ].map((item, i) => (
                  <motion.li 
                    key={item} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <Check className="w-5 h-5 text-gold" />
                    <span className="text-cream/80">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <MagneticButton>
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact">Purchase Gift Card</Link>
                </Button>
              </MagneticButton>
            </AnimatedSection>

            <AnimatedSection direction="right" className="relative">
              <motion.div 
                whileHover={{ rotate: 6 }}
                transition={{ type: "spring" }}
                className="bg-gradient-gold rounded-2xl p-1 rotate-3 shadow-gold"
              >
                <motion.div 
                  whileHover={{ rotate: -6 }}
                  transition={{ type: "spring" }}
                  className="bg-charcoal rounded-xl p-8 -rotate-3"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-10 h-10 rounded-full bg-gold flex items-center justify-center"
                    >
                      <Gift className="w-5 h-5 text-charcoal" />
                    </motion.div>
                    <span className="font-display text-xl text-gold">LuxeSalon</span>
                  </div>
                  <p className="font-display text-4xl font-semibold text-cream mb-2">$250</p>
                  <p className="text-cream/60 text-sm">Gift Card</p>
                  <div className="mt-8 pt-6 border-t border-cream/10">
                    <p className="text-xs text-cream/40">Gift Card Number</p>
                    <p className="font-mono text-cream/60">LUXE-XXXX-XXXX-XXXX</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Offers;