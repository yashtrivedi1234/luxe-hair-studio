import { absoluteUrl, SITE } from "@/lib/site";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  breadcrumbs?: { name: string; path: string }[];
};

const brandSuffix = `${SITE.name} | ${SITE.tagline}`;

export const DEFAULT_SEO: PageSeo = {
  title: brandSuffix,
  description:
    "Experience luxury hair styling at LuxeSalon Beverly Hills. Expert cuts, coloring, treatments & bridal styling. Book your appointment today.",
  path: "/",
  keywords:
    "hair salon Beverly Hills, luxury hair salon, balayage Beverly Hills, bridal hair, hair coloring, men's haircut Beverly Hills",
};

export const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    ...DEFAULT_SEO,
    breadcrumbs: [{ name: "Home", path: "/" }],
  },
  "/about": {
    title: `About Us | ${brandSuffix}`,
    description:
      "Meet the LuxeSalon team in Beverly Hills. Founded in 2009, our expert stylists deliver premium cuts, color, and bridal artistry in a luxury setting.",
    path: "/about",
    keywords: "about LuxeSalon, Beverly Hills stylists, luxury salon team, Isabella Martinez",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
  },
  "/services": {
    title: `Hair Services & Pricing | ${brandSuffix}`,
    description:
      "Explore LuxeSalon services: precision cuts, balayage, color correction, keratin treatments, bridal styling, and men's grooming in Beverly Hills.",
    path: "/services",
    keywords:
      "haircut Beverly Hills, balayage, hair color, keratin treatment, bridal styling, men's grooming",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ],
  },
  "/gallery": {
    title: `Hair Gallery & Transformations | ${brandSuffix}`,
    description:
      "Browse before-and-after hair transformations from LuxeSalon Beverly Hills — color, cuts, bridal updos, and men's styles by our expert team.",
    path: "/gallery",
    keywords: "hair gallery, hair transformations, balayage examples, bridal hair gallery",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
    ],
  },
  "/reviews": {
    title: `Client Reviews & Testimonials | ${brandSuffix}`,
    description:
      "Read verified client reviews for LuxeSalon Beverly Hills. Rated 4.8/5 for luxury haircuts, color, and bridal styling experiences.",
    path: "/reviews",
    keywords: "LuxeSalon reviews, best salon Beverly Hills reviews, hair salon testimonials",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Reviews", path: "/reviews" },
    ],
  },
  "/offers": {
    title: `Special Offers & Packages | ${brandSuffix}`,
    description:
      "Discover current LuxeSalon offers, welcome packages, and gift cards. Save on premium hair services in Beverly Hills.",
    path: "/offers",
    keywords: "salon offers Beverly Hills, hair salon packages, LuxeSalon deals, gift cards",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Offers", path: "/offers" },
    ],
  },
  "/book": {
    title: `Book an Appointment | ${brandSuffix}`,
    description:
      "Book your LuxeSalon Beverly Hills appointment online. Reserve cuts, color, treatments, or bridal styling with our expert stylists.",
    path: "/book",
    keywords: "book hair salon Beverly Hills, schedule appointment, online salon booking",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Book", path: "/book" },
    ],
  },
  "/contact": {
    title: `Contact & Location | ${brandSuffix}`,
    description:
      "Visit LuxeSalon at 123 Luxury Lane, Beverly Hills, CA 90210. Call (123) 456-7890 or message us — Mon–Fri 9AM–8PM, Sat–Sun 10AM–6PM.",
    path: "/contact",
    keywords: "LuxeSalon address, Beverly Hills salon contact, hair salon near me 90210",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ],
  },
  "/privacy": {
    title: `Privacy Policy | ${SITE.name}`,
    description: `How ${SITE.name} collects, uses, and protects your personal information when you visit our website or book services.`,
    path: "/privacy",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy" },
    ],
  },
  "/terms": {
    title: `Terms of Service | ${SITE.name}`,
    description: `Terms governing use of the ${SITE.name} website and salon booking services in Beverly Hills.`,
    path: "/terms",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Terms of Service", path: "/terms" },
    ],
  },
};

export const getPageSeo = (pathname: string): PageSeo => {
  const normalized = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;
  return PAGE_SEO[normalized] ?? {
    ...DEFAULT_SEO,
    title: `Page Not Found | ${SITE.name}`,
    description: "The page you requested could not be found on LuxeSalon.",
    path: pathname,
    noindex: true,
  };
};

export const buildHairSalonJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": `${SITE.url}/#salon`,
  name: SITE.legalName,
  alternateName: SITE.name,
  description: DEFAULT_SEO.description,
  url: SITE.url,
  logo: absoluteUrl(SITE.logo),
  image: absoluteUrl(SITE.image),
  telephone: SITE.phone,
  email: SITE.email,
  priceRange: SITE.priceRange,
  foundingDate: SITE.foundingDate,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.latitude,
    longitude: SITE.geo.longitude,
  },
  openingHoursSpecification: SITE.openingHours.flatMap((block) =>
    block.days.map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: day,
      opens: block.opens,
      closes: block.closes,
    }))
  ),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: SITE.aggregateRating.ratingValue,
    reviewCount: SITE.aggregateRating.reviewCount,
    bestRating: SITE.aggregateRating.bestRating,
    worstRating: SITE.aggregateRating.worstRating,
  },
  sameAs: [...SITE.sameAs],
  areaServed: {
    "@type": "City",
    name: "Beverly Hills",
  },
  hasMap: "https://maps.google.com/?q=Beverly+Hills+CA+90210",
});

export const buildWebsiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  publisher: { "@id": `${SITE.url}/#salon` },
  inLanguage: SITE.language,
});

export const buildBreadcrumbJsonLd = (crumbs: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

export const buildWebPageJsonLd = (seo: PageSeo) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${absoluteUrl(seo.path)}#webpage`,
  url: absoluteUrl(seo.path),
  name: seo.title,
  description: seo.description,
  isPartOf: { "@id": `${SITE.url}/#website` },
  about: { "@id": `${SITE.url}/#salon` },
  inLanguage: SITE.language,
});

export const buildServicesJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "LuxeSalon Hair Services",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Precision Haircuts",
        provider: { "@id": `${SITE.url}/#salon` },
        areaServed: "Beverly Hills",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Hair Coloring & Highlights",
        provider: { "@id": `${SITE.url}/#salon` },
        areaServed: "Beverly Hills",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Hair Spa & Treatments",
        provider: { "@id": `${SITE.url}/#salon` },
        areaServed: "Beverly Hills",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "Bridal & Special Occasion Styling",
        provider: { "@id": `${SITE.url}/#salon` },
        areaServed: "Beverly Hills",
      },
    },
  ],
});

export const buildFaqJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where is LuxeSalon located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `LuxeSalon is at ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}.`,
      },
    },
    {
      "@type": "Question",
      name: "What are LuxeSalon opening hours?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are open Monday–Friday 9:00 AM–8:00 PM and Saturday–Sunday 10:00 AM–6:00 PM.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book an appointment at LuxeSalon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Book online at our Book page, call us at (123) 456-7890, or message us on WhatsApp.",
      },
    },
  ],
});
