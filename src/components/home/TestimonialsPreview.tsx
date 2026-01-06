import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Quote, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Regular Client",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    text: "LuxeSalon transformed my look completely! The stylists truly understand what suits each individual. I've never felt more confident.",
  },
  {
    name: "Michael Chen",
    role: "VIP Member",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    text: "The attention to detail is remarkable. From the moment you walk in, you feel like royalty. Best salon experience in the city.",
  },
  {
    name: "Emily Johnson",
    role: "Bride",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    text: "They made my wedding day absolutely perfect. The bridal styling was flawless, and I received so many compliments!",
  },
];

const TestimonialsPreview = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 mb-6">
            What Our Clients
            <span className="text-gradient-gold italic"> Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Hear from our satisfied clients about
            their LuxeSalon experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-xl p-8 shadow-soft relative animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              
              <p className="text-foreground/80 mb-6 italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="default" size="lg" asChild>
            <Link to="/reviews" className="gap-2">
              Read More Reviews
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;
