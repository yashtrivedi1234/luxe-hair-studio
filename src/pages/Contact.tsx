import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone must be less than 20 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      lines: ["123 Luxury Lane, Suite 100", "Beverly Hills, CA 90210"],
    },
    {
      icon: Phone,
      title: "Call Us",
      lines: ["(123) 456-7890", "Mon-Sat: 9AM - 8PM"],
    },
    {
      icon: Mail,
      title: "Email Us",
      lines: ["hello@luxesalon.com", "bookings@luxesalon.com"],
    },
    {
      icon: Clock,
      title: "Hours",
      lines: ["Mon-Fri: 9AM - 8PM", "Sat-Sun: 10AM - 6PM"],
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Get in Touch
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold mt-4 mb-6">
              Contact
              <span className="text-gradient-gold italic"> Us</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll
              respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-4 p-6 bg-card rounded-xl border border-border">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      {item.lines.map((line) => (
                        <p key={line} className="text-muted-foreground text-sm">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/1234567890?text=${encodeURIComponent("Hello! I'd like to book an appointment at LuxeSalon.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-[#25D366]/10 rounded-xl border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Chat on WhatsApp</h3>
                    <p className="text-muted-foreground text-sm">Quick response guaranteed</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <div className="bg-card rounded-xl p-12 border border-border text-center animate-fade-up">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-4">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                  }}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 border border-border shadow-soft">
                  <h2 className="font-display text-2xl font-semibold mb-6">Send Us a Message</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        className={`h-12 mt-2 ${errors.name ? "border-destructive" : ""}`}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        className={`h-12 mt-2 ${errors.email ? "border-destructive" : ""}`}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        className={`h-12 mt-2 ${errors.phone ? "border-destructive" : ""}`}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        className={`h-12 mt-2 ${errors.subject ? "border-destructive" : ""}`}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                      {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      className={`mt-2 min-h-[150px] ${errors.message ? "border-destructive" : ""}`}
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                  </div>

                  <Button variant="hero" size="lg" type="submit" className="w-full gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203584424!2d-118.40001648478847!3d34.06908098060467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="LuxeSalon Location"
          className="grayscale"
        />
        <div className="absolute bottom-6 left-6 bg-card rounded-xl p-4 shadow-card border border-border max-w-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">LuxeSalon Beverly Hills</p>
              <p className="text-xs text-muted-foreground">123 Luxury Lane, Suite 100</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
