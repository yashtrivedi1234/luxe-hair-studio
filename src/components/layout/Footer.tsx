import { Link } from "react-router-dom";
import { Scissors, MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <Scissors className="w-5 h-5 text-charcoal" />
              </div>
              <span className="font-display text-2xl font-semibold">
                Luxe<span className="text-gold">Salon</span>
              </span>
            </Link>
            <p className="text-cream/70 text-sm leading-relaxed">
              Premium hair styling experience for the modern individual. Where luxury meets artistry.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Services", "Gallery", "Book Appointment"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "-").replace("about-us", "about").replace("book-appointment", "book")}`}
                    className="text-cream/70 hover:text-gold transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-cream/70 text-sm">
                  123 Luxury Lane, Suite 100<br />
                  Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <a href="tel:+1234567890" className="text-cream/70 hover:text-gold transition-colors text-sm">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <a href="mailto:hello@luxesalon.com" className="text-cream/70 hover:text-gold transition-colors text-sm">
                  hello@luxesalon.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Opening Hours</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold shrink-0" />
                <div className="text-sm">
                  <p className="text-cream">Mon - Fri</p>
                  <p className="text-cream/70">9:00 AM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold shrink-0" />
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
            © {new Date().getFullYear()} LuxeSalon. All rights reserved.
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
