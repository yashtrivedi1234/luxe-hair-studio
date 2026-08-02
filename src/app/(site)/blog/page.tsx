import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata = createMetadata({
  title: "Blog — Lucknow Hair & Beauty Tips",
  description: "Guides on salons, bridal makeup and haircare in Lucknow from LuxeSalon Gomti Nagar.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]} />
      <section className="pb-20 pt-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-center mb-10">Blog</h1>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {posts.map((p) => (
              <article key={p.id} className="rounded-xl border bg-card overflow-hidden shadow-soft">
                {p.coverUrl && (
                  <div className="relative aspect-[16/9]">
                    <Image src={p.coverUrl} alt="" fill className="object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="font-display text-2xl font-semibold mb-2">
                    <Link href={`/blog/${p.slug}`} className="hover:text-primary">{p.title}</Link>
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">{p.excerpt}</p>
                  <Link href={`/blog/${p.slug}`} className="text-primary text-sm font-medium">Read more →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
