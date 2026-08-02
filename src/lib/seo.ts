import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/lib/site";

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name} Lucknow`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.legalName,
      locale: SITE.locale,
      type: "website",
      images: [{ url: absoluteUrl(SITE.image), width: 1200, height: 630, alt: SITE.legalName }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(SITE.image)],
    },
    verification: {
      google: SITE.googleSiteVerification,
    },
  };
}

export function hairSalonJsonLd(aggregate?: { ratingValue: string; reviewCount: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": `${SITE.url}/#salon`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    image: absoluteUrl(SITE.image),
    logo: absoluteUrl(SITE.logo),
    priceRange: SITE.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE.address.street}, ${SITE.address.area}`,
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
    areaServed: [
      { "@type": "City", name: "Lucknow" },
      { "@type": "Place", name: "Gomti Nagar" },
      { "@type": "Place", name: "Hazratganj" },
      { "@type": "Place", name: "Indira Nagar" },
    ],
    sameAs: [...SITE.sameAs],
    ...(aggregate
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: aggregate.ratingValue,
            reviewCount: aggregate.reviewCount,
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
