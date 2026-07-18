import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { absoluteAsset, absoluteUrl, SITE } from "@/lib/site";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildHairSalonJsonLd,
  buildServicesJsonLd,
  buildWebPageJsonLd,
  buildWebsiteJsonLd,
  getPageSeo,
} from "@/lib/seo";

const META_ATTR = "data-seo-meta";
const LINK_ATTR = "data-seo-link";
const JSON_LD_ID = "seo-json-ld";

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"][${META_ATTR}]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.setAttribute(META_ATTR, "true");
    document.head.appendChild(el);
  }
  el.content = content;
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"][${LINK_ATTR}]`
  );
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    el.setAttribute(LINK_ATTR, "true");
    document.head.appendChild(el);
  }
  el.href = href;
};

const setJsonLd = (data: object[]) => {
  let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = JSON_LD_ID;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(data);
};

/**
 * Manages document title, meta tags, canonical URL, and JSON-LD per route.
 * Prefer this over a static-only head so SPA routes stay crawlable when JS runs.
 */
const SEOHead = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getPageSeo(pathname);
    const url = absoluteUrl(seo.path);
    const image = absoluteAsset(SITE.image);

    document.title = seo.title;

    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "author", SITE.name);
    upsertMeta("name", "robots", seo.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    if (seo.keywords) upsertMeta("name", "keywords", seo.keywords);
    upsertMeta("name", "geo.region", `${SITE.address.country}-${SITE.address.region}`);
    upsertMeta("name", "geo.placename", SITE.address.city);
    upsertMeta("name", "geo.position", `${SITE.geo.latitude};${SITE.geo.longitude}`);
    upsertMeta("name", "ICBM", `${SITE.geo.latitude}, ${SITE.geo.longitude}`);

    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:type", seo.ogType ?? "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", `${SITE.name} — ${SITE.tagline}`);
    upsertMeta("property", "og:site_name", SITE.name);
    upsertMeta("property", "og:locale", SITE.locale);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:site", SITE.twitterHandle);
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", image);

    upsertLink("canonical", url);

    const graph: object[] = [
      buildHairSalonJsonLd(),
      buildWebsiteJsonLd(),
      buildWebPageJsonLd(seo),
    ];
    if (seo.breadcrumbs?.length) {
      graph.push(buildBreadcrumbJsonLd(seo.breadcrumbs));
    }
    if (seo.path === "/services") {
      graph.push(buildServicesJsonLd());
    }
    if (seo.path === "/contact") {
      graph.push(buildFaqJsonLd());
    }
    setJsonLd(graph);
  }, [pathname]);

  return null;
};

export default SEOHead;
