import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { X } from "lucide-react";
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
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
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
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setLightboxImage(image.src)}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden card-hover animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-gold text-sm font-medium">{image.category}</span>
                  <h3 className="text-cream font-display text-xl font-semibold">{image.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6 text-cream" />
          </button>
          <img
            src={lightboxImage}
            alt="Gallery image"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
