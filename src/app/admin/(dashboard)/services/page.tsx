import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { formatInr } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

async function toggleService(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const active = String(formData.get("active")) === "true";
  await prisma.service.update({ where: { id }, data: { active: !active } });
  revalidatePath("/admin/services");
}

async function updatePrice(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const priceInr = Number(formData.get("priceInr"));
  if (!Number.isFinite(priceInr)) return;
  await prisma.service.update({ where: { id }, data: { priceInr } });
  revalidatePath("/admin/services");
}

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { category: "asc" } });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold mb-6">Services</h1>
      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className="rounded-xl border bg-card p-4 flex flex-wrap gap-4 items-center justify-between">
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.category} · /{s.slug}</p>
            </div>
            <form action={updatePrice} className="flex gap-2 items-center">
              <input type="hidden" name="id" value={s.id} />
              <Input name="priceInr" type="number" defaultValue={s.priceInr} className="w-28 h-8" />
              <Button type="submit" size="sm" variant="secondary">Update price</Button>
            </form>
            <form action={toggleService}>
              <input type="hidden" name="id" value={s.id} />
              <input type="hidden" name="active" value={String(s.active)} />
              <Button type="submit" size="sm" variant={s.active ? "outline" : "default"}>
                {s.active ? "Disable" : "Enable"} ({formatInr(s.priceInr)})
              </Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
