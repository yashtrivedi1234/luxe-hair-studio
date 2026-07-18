import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { X } from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const galleryImages = [
  { src: gallery1, category: "Color", title: "Balayage Transformation" },
  { src: gallery2, category: "Men's", title: "Modern Fade Cut" },
  { src: gallery3, category: "Bridal", title: "Elegant Bridal Updo" },
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=800&fit=crop", category: "Color", title: "Vibrant Red Color" },
  { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=800&fit=crop", category: "Styling", title: "Sleek Blowout" },
  { src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=800&fit=crop", category: "Men's", title: "Classic Gentleman Cut" },
  { src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=800&fit=crop", category: "Color", title: "Platinum Blonde" },
  { src: "https://images.unsplash.com/photo-1523263685509-57c1d050d19b?w=600&h=800&fit=crop", category: "Styling", title: "Beach Waves" },
  { src: "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?w=600&h=800&fit=crop", category: "Men's", title: "Textured Crop" },
];

const categories = ["All", "Color", "Styling", "Men's", "Bridal"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="pt-32 pb-16 bg-gradient-hero"
      >
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Our Work
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-semibold mt-4 mb-6">
              Inspiration
              <span className="text-gradient-gold italic"> Gallery</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Browse our portfolio of stunning transformations and find inspiration for your next look.
            </p>
          </AnimatedSection>
        </div>
      </motion.section>

      {/* Filter Tabs */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-40">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center gap-2 flex-wrap"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container-custom">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.button
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setLightboxImage({ src: image.src, title: image.title })}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={image.src}
                    alt={`${image.title} — ${image.category} hair styling at LuxeSalon Beverly Hills`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent"
                  />
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 p-6"
                  >
                    <span className="text-gold text-sm font-medium">{image.category}</span>
                    <h3 className="text-cream font-display text-xl font-semibold">{image.title}</h3>
                  </motion.div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-6 h-6 text-cream" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
              />
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal/90 to-transparent rounded-b-lg"
              >
                <h3 className="text-cream font-display text-2xl font-semibold">{lightboxImage.title}</h3>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
