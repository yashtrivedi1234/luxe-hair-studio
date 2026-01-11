import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";

interface Section {
  id: string;
  label: string;
}

const SectionIndicator = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const { scrollY } = useScroll();

  useEffect(() => {
    // Find all sections with data-section attribute
    const sectionElements = document.querySelectorAll("[data-section]");
    const sectionData: Section[] = [];

    sectionElements.forEach((el) => {
      const id = el.getAttribute("id") || el.getAttribute("data-section") || "";
      const label = el.getAttribute("data-section-label") || el.getAttribute("data-section") || "";
      if (id && label) {
        sectionData.push({ id, label });
      }
    });

    setSections(sectionData);
  }, []);

  useMotionValueEvent(scrollY, "change", () => {
    const sectionElements = document.querySelectorAll("[data-section]");
    const viewportHeight = window.innerHeight;
    
    sectionElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const id = el.getAttribute("id") || el.getAttribute("data-section") || "";
      
      // Section is active if its top is above center of viewport and bottom is below
      if (rect.top <= viewportHeight * 0.4 && rect.bottom >= viewportHeight * 0.4) {
        setActiveSection(id);
      }
    });
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (sections.length === 0) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group flex items-center gap-3"
          data-cursor="pointer"
        >
          {/* Label - appears on hover */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
          >
            {section.label}
          </motion.span>
          
          {/* Dot indicator */}
          <motion.div
            className={`relative w-2.5 h-2.5 rounded-full transition-colors ${
              activeSection === section.id
                ? "bg-primary"
                : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          >
            {activeSection === section.id && (
              <motion.div
                layoutId="activeSection"
                className="absolute inset-0 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.div>
        </button>
      ))}
    </motion.nav>
  );
};

export default SectionIndicator;
