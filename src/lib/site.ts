export const SITE = {
  name: "LuxeSalon",
  legalName: "LuxeSalon Lucknow",
  tagline: "Premium Hair & Beauty Salon in Gomti Nagar",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en_IN",
  language: "en",
  email: "hello@luxesalon.in",
  phone: "+919876543210",
  phoneDisplay: "+91 98765 43210",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  priceRange: "₹₹₹",
  foundingYear: "2018",
  image: "/og-image.jpg",
  logo: "/apple-touch-icon.png",
  googleSiteVerification: "BwlnA0OBAVBwlNSpRNJ6yxOWNyW71RZ8U3oEWcV51Ms",
  address: {
    street: "Shop 12, Twin Tower Plaza, Vibhuti Khand",
    area: "Gomti Nagar",
    city: "Lucknow",
    region: "UP",
    postalCode: "226010",
    country: "IN",
  },
  geo: {
    latitude: 26.8515,
    longitude: 81.0042,
  },
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "20:00" },
    { days: ["Sunday"], opens: "11:00", closes: "18:00" },
  ],
  sameAs: [
    "https://www.instagram.com/",
    "https://www.facebook.com/",
  ],
} as const;

export const absoluteUrl = (path = "/") => {
  const base = SITE.url.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};

export const whatsappLink = (text?: string) => {
  const msg = text || `Hi LuxeSalon Lucknow! I want to book an appointment.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
};

export const formatInr = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
