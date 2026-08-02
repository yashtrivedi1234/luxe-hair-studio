import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminHomePage() {
  const [leads, bookings, pendingReviews, services] = await Promise.all([
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.booking.count({ where: { status: { in: ["PENDING", "CONFIRMED"] } } }),
    prisma.review.count({ where: { approved: false } }),
    prisma.service.count({ where: { active: true } }),
  ]);

  const cards = [
    { label: "New leads", value: leads, href: "/admin/leads" },
    { label: "Active bookings", value: bookings, href: "/admin/bookings" },
    { label: "Reviews to approve", value: pendingReviews, href: "/admin/reviews" },
    { label: "Active services", value: services, href: "/admin/services" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-xl border bg-card p-6 shadow-soft hover:shadow-card">
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="font-display text-4xl font-semibold mt-2">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
