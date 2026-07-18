/** Canonical site + local business constants for SEO and schema. */
export const SITE = {
  name: "LuxeSalon",
  legalName: "LuxeSalon Beverly Hills",
  tagline: "Premium Hair Salon Beverly Hills",
  url: "https://luxe-hair-studio.vercel.app",
  locale: "en_US",
  language: "en",
  twitterHandle: "@LuxeSalon",
  email: "hello@luxesalon.com",
  bookingEmail: "bookings@luxesalon.com",
  phone: "+1234567890",
  phoneDisplay: "(123) 456-7890",
  priceRange: "$$$",
  foundingDate: "2009",
  image: "/og-image.jpg",
  logo: "/apple-touch-icon.png",
  address: {
    street: "123 Luxury Lane, Suite 100",
    city: "Beverly Hills",
    region: "CA",
    postalCode: "90210",
    country: "US",
  },
  geo: {
    latitude: 34.0736,
    longitude: -118.4004,
  },
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "20:00" },
    { days: ["Saturday", "Sunday"], opens: "10:00", closes: "18:00" },
  ],
  sameAs: [
    "https://www.instagram.com/",
    "https://www.facebook.com/",
  ],
  /** Derived from on-site reviews (5×5 + 4×1) / 6 */
  aggregateRating: {
    ratingValue: "4.8",
    reviewCount: "6",
    bestRating: "5",
    worstRating: "1",
  },
} as const;

export const absoluteUrl = (path = "/") => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalized === "/" ? "" : normalized}`;
};

export const absoluteAsset = (path: string) => {
  if (path.startsWith("http")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
};
