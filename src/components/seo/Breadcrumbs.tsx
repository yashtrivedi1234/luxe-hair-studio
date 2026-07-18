import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getPageSeo } from "@/lib/seo";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const seo = getPageSeo(pathname);
  const crumbs = seo.breadcrumbs;

  if (!crumbs || crumbs.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className="container-custom pt-24 pb-2">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />}
              {isLast ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link to={crumb.path} className="hover:text-primary transition-colors">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
