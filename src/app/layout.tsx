import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { createMetadata, hairSalonJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";
import { Toaster } from "sonner";
import { Providers } from "@/components/Providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  ...createMetadata({
    title: `${SITE.name} | Premium Hair Salon Gomti Nagar Lucknow`,
    description:
      "LuxeSalon Lucknow — haircuts, balayage, keratin & bridal makeup in Gomti Nagar. Book online or WhatsApp. Open Mon–Sat 10AM–8PM.",
    path: "/",
  }),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable} font-body antialiased`}>
        <JsonLd data={hairSalonJsonLd({ ratingValue: "4.8", reviewCount: "4" })} />
        <Providers>
          {children}
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
