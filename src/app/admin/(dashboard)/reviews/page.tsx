import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";

async function setApproval(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const approved = String(formData.get("approved")) === "true";
  await prisma.review.update({ where: { id }, data: { approved } });
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
}

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold mb-6">Reviews</h1>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-xl border bg-card p-4">
            <div className="flex justify-between gap-4 flex-wrap">
              <div>
                <p className="font-medium">{r.name} · {r.rating}/5 {r.approved ? "✓" : "(pending)"}</p>
                <p className="text-sm text-muted-foreground mt-1">{r.text}</p>
              </div>
              <form action={setApproval} className="flex gap-2">
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="approved" value={String(!r.approved)} />
                <Button type="submit" size="sm" variant="secondary">
                  {r.approved ? "Unpublish" : "Approve"}
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
