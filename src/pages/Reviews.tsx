import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Star, Quote, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggerContainer, { staggerItemVariants } from "@/components/animations/StaggerContainer";
import MagneticButton from "@/components/animations/MagneticButton";

const reviews = [
  {
    name: "Sarah Mitchell",
    date: "3 weeks ago",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    title: "Absolutely Amazing Experience!",
    text: "LuxeSalon transformed my look completely! The stylists truly understand what suits each individual. I came in with frizzy, damaged hair and left with the most beautiful balayage I've ever had. Isabella and her team are absolute professionals.",
    service: "Balayage & Treatment",
  },
  {
    name: "Michael Chen",
    date: "1 month ago",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    title: "Best Barber in Beverly Hills",
    text: "Marcus is hands down the best barber I've ever been to. The attention to detail is remarkable. From the moment you walk in, you feel like royalty. The hot towel service and complimentary beverages are a nice touch too!",
    service: "Men's Haircut",
  },
  {
    name: "Emily Johnson",
    date: "3 weeks ago",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    title: "Perfect Wedding Day Hair",
    text: "Sophie made my wedding day absolutely perfect. The bridal styling was flawless, and I received so many compliments! She took the time to understand exactly what I wanted and exceeded all expectations. Worth every penny!",
    service: "Bridal Styling",
  },
  {
    name: "Jessica Williams",
    date: "1 week ago",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    rating: 5,
    title: "Life-Changing Color Correction",
    text: "After a disaster at another salon, David worked his magic and fixed my hair. The color correction took 6 hours but the result was worth it. He's a true artist and my hair has never looked healthier.",
    service: "Color Correction",
  },
  {
    name: "Amanda Torres",
    date: "2 months ago",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    rating: 5,
    title: "My Go-To Salon for 3 Years",
    text: "I've been coming to LuxeSalon for three years now and have never been disappointed. The consistency in quality is impressive. Every stylist is talented and the atmosphere is so relaxing. It's my monthly self-care treat!",
    service: "Regular Client",
  },
  {
    name: "Robert Kim",
    date: "1 month ago",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 4,
    title: "Great Service, Premium Quality",
    text: "The service quality is excellent and worth the premium pricing. Only minor issue was a slight wait time during peak hours, but the results always make up for it. The team is professional and accommodating.",
    service: "Men's Haircut & Beard",
  },
];

const Reviews = () => {
  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-8 pb-16 bg-gradient-hero">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Client Reviews
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold mt-4 mb-6">
              What Our Clients
              <span className="text-gradient-gold italic"> Say</span>
            </h1>
            
            {/* Rating Summary */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-4 bg-card rounded-2xl p-6 shadow-soft mt-4"
            >
              <div className="text-center pr-4 border-r border-border">
                <p className="font-display text-5xl font-bold text-primary">{averageRating}</p>
                <div className="flex gap-1 justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <Star className="w-4 h-4 fill-gold text-gold" />
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="text-left">
                <p className="font-semibold">Exceptional</p>
                <p className="text-sm text-muted-foreground">Based on 500+ reviews</p>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                variants={staggerItemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card rounded-xl p-8 shadow-soft border border-border/50"
              >
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "fill-gold text-gold" : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                
                <h3 className="font-display text-lg font-semibold mb-2">{review.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  "{review.text}"
                </p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.service}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>

          {/* Google Reviews Link */}
          <AnimatedSection delay={0.2} className="text-center mt-16">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 bg-secondary rounded-xl p-6"
            >
              <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold">See all our reviews on Google</p>
                <p className="text-sm text-muted-foreground">4.9 stars from 500+ reviews</p>
              </div>
              <motion.a
                whileHover={{ scale: 1.1, rotate: 15 }}
                href="https://google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-muted-foreground" />
              </motion.a>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-charcoal text-cream">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Ready to Experience LuxeSalon?
            </h2>
            <p className="text-cream/70 mb-8 max-w-xl mx-auto">
              Join our community of satisfied clients and discover why we're Beverly Hills' most loved salon.
            </p>
            <MagneticButton>
              <Button variant="hero" size="xl" asChild>
                <Link to="/book">Book Your Appointment</Link>
              </Button>
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;