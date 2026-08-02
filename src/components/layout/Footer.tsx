import Link from "next/link";
import { Scissors, MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { SITE } from "@/lib/site";

const quick = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Offers", href: "/offers" },
  { name: "Blog", href: "/blog" },
  { name: "Book", href: "/book" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative bg-charcoal text-cream mt-auto overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute -top-32 right-0 w-80 h-80 bg-gold/5 blur-3xl rounded-full pointer-events-none" />
      <div className="container mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-11 h-11 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-gold">
              <Scissors className="w-5 h-5 text-charcoal" />
            </span>
            <span className="font-display text-2xl font-semibold">
              Luxe<span className="text-gold">Salon</span>
            </span>
          </Link>
          <p className="text-cream/65 text-sm leading-relaxed max-w-xs">
            Premium hair, colour, treatments & bridal styling in Gomti Nagar, Lucknow.
          </p>
          <div className="flex gap-3">
            <a
              href={SITE.sameAs[0]}
              className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"
              aria-label="Instagram"
              rel="me noopener noreferrer"
              target="_blank"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={SITE.sameAs[1]}
              className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"
              aria-label="Facebook"
              rel="me noopener noreferrer"
              target="_blank"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold mb-5">Explore</h2>
          <ul className="space-y-2.5">
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cream/65 text-sm hover:text-gold transition-colors">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold mb-5">Visit</h2>
          <ul className="space-y-4 text-sm text-cream/65">
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>
                {SITE.address.street}
                <br />
                {SITE.address.area}, {SITE.address.city} {SITE.address.postalCode}
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="w-4 h-4 text-gold" />
              <a href={`tel:${SITE.phone}`} className="hover:text-gold transition-colors">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="w-4 h-4 text-gold" />
              <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold mb-5">Hours</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <Clock className="w-4 h-4 text-gold shrink-0" />
              <div>
                <p className="text-cream">Mon – Sat</p>
                <p className="text-cream/65">10:00 AM – 8:00 PM</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Clock className="w-4 h-4 text-gold shrink-0" />
              <div>
                <p className="text-cream">Sunday</p>
                <p className="text-cream/65">11:00 AM – 6:00 PM</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6 text-center text-cream/45 text-sm flex flex-col md:flex-row gap-3 justify-center items-center relative z-10">
        <p>
          © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
        </p>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-gold transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-gold transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
