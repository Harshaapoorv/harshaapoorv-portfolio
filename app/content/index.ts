/**
 * Loads and validates everything in /content. Pages import from here, never from JSON directly.
 * Adding content/projects/<slug>.json (or experience/<slug>.json) is all it takes to add a page.
 */
import type { z } from "zod";
import siteJson from "@content/site.json";
import aboutJson from "@content/about.json";
import {
  aboutSchema,
  experienceSchema,
  projectSchema,
  siteSchema,
  type Experience,
  type Project,
} from "./schema";

function parse<T extends z.ZodType>(schema: T, data: unknown, file: string): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`);
    throw new Error(`Invalid content in ${file}:\n${issues.join("\n")}`);
  }
  return result.data;
}

const slugOf = (path: string) =>
  path
    .split("/")
    .pop()!
    .replace(/\.json$/, "");

function loadCollection<T extends z.ZodObject>(files: Record<string, unknown>, schema: T) {
  return Object.entries(files).map(([path, data]) => ({
    ...(parse(schema, data, path.replace(/^\//, "")) as z.infer<T>),
    slug: slugOf(path),
  }));
}

export const site = parse(siteSchema, siteJson, "content/site.json");
export const about = parse(aboutSchema, aboutJson, "content/about.json");

export const projects: Project[] = loadCollection(
  import.meta.glob("/content/projects/*.json", { eager: true, import: "default" }),
  projectSchema,
).sort((a, b) => a.order - b.order);

export const experiences: Experience[] = loadCollection(
  import.meta.glob("/content/experience/*.json", { eager: true, import: "default" }),
  experienceSchema,
).sort((a, b) => a.order - b.order);

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getExperience = (slug: string) => experiences.find((e) => e.slug === slug);

/** Previous/next neighbours for detail-page navigation (wraps around). */
export function neighbours<T>(list: T[], item: T) {
  const i = list.indexOf(item);
  return {
    prev: list[(i - 1 + list.length) % list.length]!,
    next: list[(i + 1) % list.length]!,
  };
}
