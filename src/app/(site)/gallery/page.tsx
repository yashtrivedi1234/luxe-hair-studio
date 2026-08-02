import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = createMetadata({
  title: "Gallery",
  description: "Hair colour, cuts and bridal looks from LuxeSalon Lucknow.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <>
      <div className="bg-gradient-hero border-b border-border/40">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Gallery", href: "/gallery" }]} />
        <div className="container mx-auto px-4 pb-12 pt-4 text-center">
          <Reveal>
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">Portfolio</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">Our Work</h1>
            <div className="gold-line" />
          </Reveal>
        </div>
      </div>
      <section className="pb-24 pt-10">
        <div className="container mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) * 80} className="break-inside-avoid">
                <figure className="relative overflow-hidden rounded-2xl group shadow-soft">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={item.imageUrl}
                      alt={`${item.title} — ${item.category} at LuxeSalon Lucknow`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent text-cream translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-gold text-xs tracking-widest uppercase">{item.category}</p>
                    <p className="font-display text-lg font-semibold">{item.title}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
