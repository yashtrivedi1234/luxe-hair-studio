import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";

async function updateLeadStatus(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold mb-6">Leads</h1>
      <div className="rounded-xl border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Source</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="p-3">
                  <div className="font-medium">{l.name}</div>
                  <div className="text-xs text-muted-foreground max-w-xs truncate">{l.message}</div>
                </td>
                <td className="p-3">{l.phone}</td>
                <td className="p-3">{l.source}</td>
                <td className="p-3">{l.status}</td>
                <td className="p-3">
                  <form action={updateLeadStatus} className="flex gap-2 items-center">
                    <input type="hidden" name="id" value={l.id} />
                    <select name="status" defaultValue={l.status} className="h-8 rounded border px-2 text-xs">
                      {["NEW", "CONTACTED", "BOOKED", "COMPLETED", "LOST"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <Button type="submit" size="sm" variant="secondary">Save</Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
