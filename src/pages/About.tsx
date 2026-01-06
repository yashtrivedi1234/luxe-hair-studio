import Layout from "@/components/layout/Layout";
import { Award, Heart, Sparkles, Users } from "lucide-react";
import founderImage from "@/assets/founder.jpg";

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
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
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
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src={founderImage}
                alt="Isabella Martinez - Founder"
                className="rounded-2xl shadow-card w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-6 shadow-soft border border-border">
                <p className="font-display text-4xl font-semibold text-primary">15+</p>
                <p className="text-muted-foreground text-sm">Years of Excellence</p>
              </div>
            </div>
            
            <div>
              <span className="text-primary text-sm font-medium tracking-widest uppercase">
                Our Beginning
              </span>
              <h2 className="font-display text-4xl font-semibold mt-4 mb-6">
                A Vision of Elegance
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  LuxeSalon was born from Isabella Martinez's dream to create more than just a
                  salon—a sanctuary where clients could escape the everyday and emerge transformed.
                </p>
                <p>
                  After training at prestigious academies in Paris and Milan, Isabella brought her
                  expertise back to Beverly Hills with a clear vision: combine European sophistication
                  with California's relaxed luxury.
                </p>
                <p>
                  Today, our team of 50+ expert stylists continues this legacy, delivering personalized
                  experiences that have earned us numerous industry awards and the loyalty of thousands
                  of clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              What Drives Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="group card-hover animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 image-overlay">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-lg font-semibold">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="section-padding bg-charcoal text-cream">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Recognition
            </span>
            <h2 className="font-display text-4xl font-semibold mt-4">
              Awards & Certifications
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { year: "2024", award: "Best Luxury Salon - LA Weekly" },
              { year: "2023", award: "Top 10 Colorists - Allure Magazine" },
              { year: "2022", award: "Excellence in Bridal Styling" },
              { year: "2021", award: "Sustainable Salon Award" },
            ].map((item) => (
              <div key={item.year} className="p-6 rounded-xl bg-cream/5 border border-cream/10">
                <p className="text-gold text-2xl font-display font-semibold mb-2">{item.year}</p>
                <p className="text-cream/70 text-sm">{item.award}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
