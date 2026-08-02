import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ReviewForm } from "@/components/forms/ReviewForm";

export const metadata = createMetadata({
  title: "Client Reviews Lucknow",
  description: "Real reviews for LuxeSalon Gomti Nagar — haircuts, balayage and bridal makeup.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Reviews", href: "/reviews" }]} />
      <section className="pb-20 pt-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-center mb-10">Reviews</h1>
          <div className="space-y-6 mb-16">
            {reviews.map((r) => (
              <blockquote key={r.id} className="rounded-xl border bg-card p-6 shadow-soft">
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="italic text-foreground/80 mb-3">&ldquo;{r.text}&rdquo;</p>
                <footer className="text-sm font-semibold">
                  {r.name}
                  {r.service ? <span className="text-muted-foreground font-normal"> · {r.service}</span> : null}
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold mb-4">Share your experience</h2>
            <ReviewForm />
          </div>
        </div>
      </section>
    </>
  );
}
