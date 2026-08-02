"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
  { name: "Offers", href: "/offers" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const transparent = isHome && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        transparent
          ? "bg-transparent border-transparent"
          : "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-soft"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            className={cn(
              "w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-gold transition-transform duration-300 group-hover:scale-105",
            )}
          >
            <Scissors className={cn("w-4 h-4", transparent ? "text-charcoal" : "text-primary-foreground")} aria-hidden />
          </span>
          <span
            className={cn(
              "font-display text-xl md:text-2xl font-semibold tracking-tight transition-colors",
              transparent ? "text-cream" : "text-foreground"
            )}
          >
            Luxe<span className="text-gold">Salon</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative text-sm font-medium tracking-wide transition-colors link-underline",
                pathname === l.href
                  ? "text-gold"
                  : transparent
                    ? "text-cream/80 hover:text-cream"
                    : "text-foreground/75 hover:text-primary"
              )}
            >
              {l.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${SITE.phone}`}
            className={cn(
              "flex items-center gap-2 text-sm transition-colors",
              transparent ? "text-cream/75 hover:text-cream" : "text-muted-foreground hover:text-primary"
            )}
          >
            <Phone className="w-4 h-4" />
            {SITE.phoneDisplay}
          </a>
          <Button variant="hero" className="rounded-full px-6" asChild>
            <Link href="/book">Book Now</Link>
          </Button>
        </div>

        <button
          className={cn("lg:hidden p-2 rounded-full", transparent ? "text-cream" : "text-foreground")}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl px-4 py-5 space-y-1 animate-fade-in">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 px-2 font-medium rounded-lg hover:bg-secondary"
              onClick={() => setOpen(false)}
            >
              {l.name}
            </Link>
          ))}
          <Button variant="hero" className="w-full mt-3 rounded-full" asChild>
            <Link href="/book" onClick={() => setOpen(false)}>
              Book Now
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}
