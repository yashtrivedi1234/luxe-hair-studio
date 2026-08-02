import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-24 pb-2">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-60" aria-hidden />}
              {last ? (
                <span className="text-foreground font-medium" aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-primary">{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
