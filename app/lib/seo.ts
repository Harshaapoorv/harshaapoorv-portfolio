import type { MetaDescriptor } from "react-router";
import { site } from "~/content";

type SeoInput = {
  /** Page title without the site name; omit for the home page. */
  title?: string;
  description?: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

/** Builds title, description, canonical, Open Graph and Twitter tags for a page. */
export function seo({ title, description, path, image, type = "website" }: SeoInput): MetaDescriptor[] {
  const fullTitle = title ? `${title} · ${site.name}` : site.seo.title;
  const desc = description ?? site.seo.description;
  const url = new URL(path, site.url).toString();
  const img = new URL(image ?? site.seo.image, site.url).toString();
  return [
    { title: fullTitle },
    { name: "description", content: desc },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: desc },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: desc },
    { name: "twitter:image", content: img },
  ];
}
