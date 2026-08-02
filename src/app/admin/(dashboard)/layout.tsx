import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/reviews", label: "Reviews" },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="min-h-screen flex bg-secondary/30">
      <aside className="w-56 shrink-0 border-r bg-card p-4 space-y-1">
        <p className="font-display text-lg font-semibold px-2 mb-4">LuxeSalon Admin</p>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="block rounded-md px-3 py-2 text-sm hover:bg-secondary">
            {l.label}
          </Link>
        ))}
        <form action="/api/auth/signout" method="POST" className="pt-4">
          <Link href="/api/auth/signout" className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary">
            Sign out
          </Link>
        </form>
        <Link href="/" className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary">
          ← Public site
        </Link>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-auto">{children}</main>
    </div>
  );
}
