import { Link } from "react-router-dom";
import { Scissors, MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { SITE } from "@/lib/site";

const quickLinks = [
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Gallery", path: "/gallery" },
  { name: "Reviews", path: "/reviews" },
  { name: "Offers", path: "/offers" },
  { name: "Book Appointment", path: "/book" },
  { name: "Contact", path: "/contact" },
];

const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream" itemScope itemType="https://schema.org/HairSalon">
      <meta itemProp="name" content={SITE.legalName} />
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <Scissors className="w-5 h-5 text-charcoal" aria-hidden="true" />
              </div>
              <span className="font-display text-2xl font-semibold">
                Luxe<span className="text-gold">Salon</span>
              </span>
            </Link>
            <p className="text-cream/70 text-sm leading-relaxed" itemProp="description">
              Premium hair styling experience for the modern individual. Where luxury meets artistry
              in Beverly Hills.
            </p>
            <div className="flex gap-4">
              <a
                href={SITE.sameAs[0]}
                target="_blank"
                rel="noopener noreferrer me"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold transition-colors"
                aria-label="Follow LuxeSalon on Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={SITE.sameAs[1]}
                target="_blank"
                rel="noopener noreferrer me"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold transition-colors"
                aria-label="Follow LuxeSalon on Facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-display text-lg font-semibold mb-6">Quick Links</h2>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-cream/70 hover:text-gold transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <h2 className="font-display text-lg font-semibold mb-6">Contact Us</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-cream/70 text-sm">
                  <span itemProp="streetAddress">{SITE.address.street}</span>
                  <br />
                  <span itemProp="addressLocality">{SITE.address.city}</span>,{" "}
                  <span itemProp="addressRegion">{SITE.address.region}</span>{" "}
                  <span itemProp="postalCode">{SITE.address.postalCode}</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${SITE.phone}`}
                  className="text-cream/70 hover:text-gold transition-colors text-sm"
                  itemProp="telephone"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-cream/70 hover:text-gold transition-colors text-sm"
                  itemProp="email"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h2 className="font-display text-lg font-semibold mb-6">Opening Hours</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold shrink-0" aria-hidden="true" />
                <div className="text-sm">
                  <p className="text-cream">Mon - Fri</p>
                  <p className="text-cream/70">9:00 AM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold shrink-0" aria-hidden="true" />
                <div className="text-sm">
                  <p className="text-cream">Sat - Sun</p>
                  <p className="text-cream/70">10:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/50 text-sm">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-cream/50 hover:text-gold transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-cream/50 hover:text-gold transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
