import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";

async function updateBookingStatus(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  await prisma.booking.update({ where: { id }, data: { status } });
  revalidatePath("/admin/bookings");
}

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { service: true, stylist: true },
    take: 100,
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold mb-6">Bookings</h1>
      <div className="rounded-xl border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Service</th>
              <th className="p-3">When</th>
              <th className="p-3">Status</th>
              <th className="p-3">Update</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3">
                  <div className="font-medium">{b.customerName}</div>
                  <div className="text-xs text-muted-foreground">{b.customerPhone}</div>
                </td>
                <td className="p-3">
                  {b.service.name}
                  <div className="text-xs text-muted-foreground">{b.stylist?.name || "Any stylist"}</div>
                </td>
                <td className="p-3">{b.date} {b.time}</td>
                <td className="p-3">{b.status}</td>
                <td className="p-3">
                  <form action={updateBookingStatus} className="flex gap-2">
                    <input type="hidden" name="id" value={b.id} />
                    <select name="status" defaultValue={b.status} className="h-8 rounded border px-2 text-xs">
                      {["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "LOST"].map((s) => (
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
