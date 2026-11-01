import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { about, experiences, projects, site } from "~/content";
import type { Section } from "~/content/schema";

const inPublic = (p: string) => existsSync(join(process.cwd(), "public", p));

function imagesIn(sections: Section[]) {
  return sections.flatMap((s) => (s.type === "gallery" ? s.images.map((i) => i.src) : []));
}

describe("content", () => {
  it("loads and validates every file", () => {
    expect(site.name).toBeTruthy();
    expect(about.paragraphs.length).toBeGreaterThan(0);
    expect(projects.length).toBeGreaterThan(0);
    expect(experiences.length).toBeGreaterThan(0);
  });

  it("has unique order values so sorting is stable", () => {
    for (const list of [projects, experiences]) {
      const orders = list.map((x) => x.order);
      expect(new Set(orders).size).toBe(orders.length);
    }
  });

  it("points every image and resume at a real file in /public", () => {
    const files = [
      site.hero.avatar.src,
      site.seo.image,
      ...site.resumes.map((r) => r.file),
      ...projects.flatMap((p) => [p.cover?.src, ...imagesIn(p.sections)]),
      ...experiences.flatMap((e) => imagesIn(e.sections)),
    ].filter((f): f is string => !!f);
    const missing = files.filter((f) => !inPublic(f));
    expect(missing).toEqual([]);
  });

  it("only links internally to pages that exist", () => {
    const pages = new Set([
      "/", "/about", "/experience", "/projects", "/contact",
      ...projects.map((p) => `/projects/${p.slug}`),
      ...experiences.map((e) => `/experience/${e.slug}`),
    ]);
    const internal = [
      ...site.nav.map((n) => n.to),
      ...site.chapters.items.map((c) => c.to),
      site.cta.button.to,
      site.hero.primaryCta.to,
      ...[...projects, ...experiences].flatMap((x) => x.links.map((l) => l.url)),
    ].filter((u): u is string => !!u && u.startsWith("/") && !u.startsWith("/resumes/"));
    expect(internal.filter((u) => !pages.has(u))).toEqual([]);
  });

  it("features at least one project and gives cover-less projects a badge", () => {
    expect(projects.some((p) => p.featured)).toBe(true);
    expect(projects.filter((p) => !p.cover && !p.badge).map((p) => p.slug)).toEqual([]);
  });

  it("has exactly one default resume", () => {
    expect(site.resumes.filter((r) => r.default)).toHaveLength(1);
  });
});
