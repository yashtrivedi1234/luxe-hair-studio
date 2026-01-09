import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Check, Clock, User, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggerContainer, { staggerItemVariants } from "@/components/animations/StaggerContainer";
import MagneticButton from "@/components/animations/MagneticButton";

const services = [
  { value: "haircut-women", label: "Women's Haircut & Style", duration: "60 min", price: "$95" },
  { value: "haircut-men", label: "Men's Haircut", duration: "45 min", price: "$65" },
  { value: "haircut-kids", label: "Kids Haircut", duration: "30 min", price: "$45" },
  { value: "color-full", label: "Full Color", duration: "90 min", price: "$150+" },
  { value: "balayage", label: "Balayage / Ombré", duration: "180 min", price: "$250+" },
  { value: "highlights", label: "Full Highlights", duration: "120 min", price: "$200+" },
  { value: "keratin", label: "Keratin Smoothing", duration: "180 min", price: "$350+" },
  { value: "treatment", label: "Deep Conditioning", duration: "30 min", price: "$55" },
  { value: "bridal-trial", label: "Bridal Hair Trial", duration: "90 min", price: "$150" },
  { value: "bridal-day", label: "Wedding Day Styling", duration: "120 min", price: "$300" },
];

const stylists = [
  { value: "any", label: "Any Available Stylist" },
  { value: "isabella", label: "Isabella Martinez - Creative Director" },
  { value: "david", label: "David Thompson - Senior Colorist" },
  { value: "sophie", label: "Sophie Williams - Bridal Specialist" },
  { value: "marcus", label: "Marcus Lee - Men's Styling Expert" },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM",
];

const Book = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState("");
  const [selectedStylist, setSelectedStylist] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!selectedService || !date || !selectedTime || !formData.firstName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitted(true);
  };

  const selectedServiceData = services.find(s => s.value === selectedService);

  if (isSubmitted) {
    return (
      <Layout>
        <section className="pt-32 pb-16 min-h-screen bg-gradient-hero">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8"
              >
                <Check className="w-10 h-10 text-primary" />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-4xl md:text-5xl font-semibold mb-4"
              >
                Booking Confirmed!
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-lg mb-8"
              >
                Thank you for choosing LuxeSalon. We've sent a confirmation email to {formData.email}.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-xl p-8 shadow-soft border border-border mb-8 text-left"
              >
                <h3 className="font-display text-xl font-semibold mb-6">Appointment Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium">{selectedServiceData?.label}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{date && format(date, "EEEE, MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-muted-foreground">Stylist</span>
                    <span className="font-medium">
                      {stylists.find(s => s.value === selectedStylist)?.label || "Any Available"}
                    </span>
                  </div>
                </div>
              </motion.div>

              <MagneticButton>
                <Button variant="hero" size="lg" asChild>
                  <Link to="/">Return to Home</Link>
                </Button>
              </MagneticButton>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Book Online
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold mt-4 mb-6">
              Schedule Your
              <span className="text-gradient-gold italic"> Appointment</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose your service, stylist, and preferred time. We'll take care of the rest.
            </p>
          </AnimatedSection>

          {/* Progress Steps */}
          <AnimatedSection delay={0.2} className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {[
                { num: 1, label: "Service", icon: Scissors },
                { num: 2, label: "Date & Time", icon: Clock },
                { num: 3, label: "Your Details", icon: User },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(s.num)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                      step >= s.num
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <s.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{s.label}</span>
                    <span className="sm:hidden">{s.num}</span>
                  </motion.button>
                  {i < 2 && <div className="w-8 h-0.5 bg-muted mx-2" />}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding bg-background -mt-8">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Select a Service</Label>
                  <StaggerContainer className="grid gap-3">
                    {services.map((service) => (
                      <motion.button
                        key={service.value}
                        variants={staggerItemVariants}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedService(service.value)}
                        className={cn(
                          "flex items-center justify-between p-5 rounded-xl border transition-all text-left",
                          selectedService === service.value
                            ? "border-primary bg-primary/5 shadow-soft"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div>
                          <p className="font-medium">{service.label}</p>
                          <p className="text-sm text-muted-foreground">{service.duration}</p>
                        </div>
                        <p className="font-display text-lg font-semibold text-primary">
                          {service.price}
                        </p>
                      </motion.button>
                    ))}
                  </StaggerContainer>
                </div>

                <AnimatedSection delay={0.3}>
                  <Label className="text-lg font-semibold mb-4 block">Preferred Stylist</Label>
                  <Select value={selectedStylist} onValueChange={setSelectedStylist}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a stylist (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {stylists.map((stylist) => (
                        <SelectItem key={stylist.value} value={stylist.value}>
                          {stylist.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </AnimatedSection>

                <MagneticButton>
                  <Button
                    variant="hero"
                    size="xl"
                    className="w-full"
                    onClick={() => setStep(2)}
                    disabled={!selectedService}
                  >
                    Continue to Date & Time
                  </Button>
                </MagneticButton>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <AnimatedSection>
                  <Label className="text-lg font-semibold mb-4 block">Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "EEEE, MMMM d, yyyy") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                  <Label className="text-lg font-semibold mb-4 block">Select Time</Label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {timeSlots.map((time, index) => (
                      <motion.button
                        key={time}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "p-3 rounded-lg border text-sm font-medium transition-all",
                          selectedTime === time
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </AnimatedSection>

                <div className="flex gap-4">
                  <Button variant="outline" size="lg" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <MagneticButton className="flex-1">
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={() => setStep(3)}
                      disabled={!date || !selectedTime}
                      className="w-full"
                    >
                      Continue
                    </Button>
                  </MagneticButton>
                </div>
              </motion.div>
            )}

            {/* Step 3: Personal Details */}
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <AnimatedSection className="bg-card rounded-xl p-6 border border-border mb-8">
                  <h3 className="font-semibold mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Service:</span> {selectedServiceData?.label}</p>
                    <p><span className="text-muted-foreground">Date:</span> {date && format(date, "EEEE, MMMM d, yyyy")}</p>
                    <p><span className="text-muted-foreground">Time:</span> {selectedTime}</p>
                    <p><span className="text-muted-foreground">Price:</span> {selectedServiceData?.price}</p>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      className="h-12 mt-2"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      className="h-12 mt-2"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    className="h-12 mt-2"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="h-12 mt-2"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </AnimatedSection>

                <AnimatedSection delay={0.25}>
                  <Label htmlFor="notes">Special Requests (Optional)</Label>
                  <Input
                    id="notes"
                    className="h-12 mt-2"
                    placeholder="Any special requests or notes for your stylist"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </AnimatedSection>

                <div className="flex gap-4">
                  <Button variant="outline" size="lg" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <MagneticButton className="flex-1">
                    <Button variant="hero" size="lg" onClick={handleSubmit} className="w-full">
                      Confirm Booking
                    </Button>
                  </MagneticButton>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Book;