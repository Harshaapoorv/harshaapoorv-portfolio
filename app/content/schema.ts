/**
 * Content schema. Every JSON file in /content is validated against these shapes at build time,
 * so a typo or a missing field fails the build with a readable message instead of breaking the live site.
 */
import { z } from "zod";

const text = z.string().min(1);
/** A path to a file in /public, e.g. "/images/projects/notesapp/cover.webp". */
const publicPath = z.string().regex(/^\//, "must start with / (a file inside /public)");
const url = z
  .string()
  .regex(/^(https?:\/\/|mailto:|\/)/, "must be an http(s) URL, mailto: link or a site path");

export const imageSchema = z.object({
  src: publicPath,
  alt: text,
  caption: z.string().optional(),
  /** "wide" for banners/diagrams, "phone" for tall phone screenshots. */
  shape: z.enum(["wide", "phone"]).default("wide"),
});

export const linkSchema = z.object({
  label: text,
  url,
  /** The first primary link is rendered as the blue button. */
  primary: z.boolean().default(false),
});

export const statSchema = z.object({
  value: text,
  label: text,
  tone: z.enum(["plain", "yellow", "blue"]).default("plain"),
});

/** Categories drive the filter chips on /projects and the role list on the home page. */
export const categorySchema = z.enum(["Mobile", "Frontend", "Backend", "Full Stack", "AI/ML"]);

/** Reusable section blocks shared by project and experience detail pages. */
export const sectionSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("text"), title: text, paragraphs: z.array(text).min(1) }),
  z.object({
    type: z.literal("cards"),
    title: text,
    items: z.array(z.object({ title: text, text: text, highlight: z.boolean().default(false) })).min(1),
  }),
  z.object({
    type: z.literal("metrics"),
    title: text,
    items: z.array(z.object({ value: text, text: text })).min(1),
  }),
  z.object({ type: z.literal("list"), title: text, items: z.array(text).min(1) }),
  z.object({
    type: z.literal("timeline"),
    title: text,
    items: z.array(z.object({ date: text, text: text })).min(1),
  }),
  z.object({ type: z.literal("gallery"), title: text, images: z.array(imageSchema).min(1) }),
]);

export const projectSchema = z.object({
  title: text,
  /** One or two sentences for cards. */
  summary: text,
  /** Short label line on cards, e.g. "Solo · Apr – Jun 2026". */
  meta: text,
  categories: z.array(categorySchema).min(1),
  status: z.enum(["shipped", "in-development", "archived"]).default("shipped"),
  featured: z.boolean().default(false),
  /** Lower numbers come first. */
  order: z.number().int(),
  cover: imageSchema.optional(),
  /** Big comic text shown on the card when there is no cover image. */
  badge: z.string().optional(),
  headline: text,
  intro: text,
  role: text,
  stack: z.array(text).min(1),
  stats: z.array(statSchema).default([]),
  links: z.array(linkSchema).default([]),
  sections: z.array(sectionSchema).default([]),
  seo: z.object({ description: text }).optional(),
});

export const experienceSchema = z.object({
  role: text,
  organization: text,
  /** 2–4 letters shown in the logo tile. */
  monogram: z.string().min(1).max(4),
  period: text,
  location: text,
  type: text,
  order: z.number().int(),
  featured: z.boolean().default(false),
  summary: text,
  headline: text,
  intro: text,
  stack: z.array(text).default([]),
  stats: z.array(statSchema).default([]),
  links: z.array(linkSchema).default([]),
  sections: z.array(sectionSchema).default([]),
  seo: z.object({ description: text }).optional(),
});

const navItem = z.object({ label: text, to: publicPath });

export const siteSchema = z.object({
  name: text,
  fullName: text,
  url: z.string().url(),
  email: z.string().email(),
  seo: z.object({ title: text, description: text, image: publicPath }),
  nav: z.array(navItem).min(1),
  socials: z.array(z.object({ label: text, url })).min(1),
  resumes: z
    .array(z.object({ role: text, label: text, file: publicPath, default: z.boolean().default(false) }))
    .min(1),
  hero: z.object({
    tag: text,
    headline: text,
    rolePrefix: text,
    roles: z.array(text).min(1),
    roleSuffix: z.string(),
    intro: text,
    primaryCta: navItem,
    avatar: imageSchema,
    panelCaption: text,
    bigStamp: z.object({ value: text, label: text }),
    smallStamp: text,
    resumeHint: text,
  }),
  stats: z.array(statSchema).min(1),
  featured: z.object({ label: text, heading: text }),
  chapters: z.object({
    label: text,
    heading: text,
    items: z.array(z.object({ label: text, title: text, text: text, to: publicPath.optional() })).min(1),
  }),
  marquee: z.array(text).min(1),
  cta: z.object({ heading: text, text: text, button: navItem }),
  footer: z.object({ text: text }),
  pages: z.object({
    experience: z.object({ label: text, heading: text, intro: text }),
    projects: z.object({ label: text, heading: text, intro: text }),
    contact: z.object({
      label: text,
      heading: text,
      intro: text,
      formTitle: text,
      success: text,
      note: text,
    }),
    notFound: z.object({ heading: text, text: text }),
  }),
});

export const aboutSchema = z.object({
  label: text,
  heading: text,
  paragraphs: z.array(text).min(1),
  characterStats: z.object({ title: text, items: z.array(z.object({ key: text, value: text })).min(1) }),
  journey: z.object({
    heading: text,
    items: z.array(z.object({ year: text, title: text, text: text })).min(1),
  }),
  education: z.object({
    heading: text,
    items: z.array(z.object({ school: text, degree: text, period: text, detail: z.string().optional() })),
  }),
  skills: z.object({
    heading: text,
    groups: z.array(z.object({ name: text, items: z.array(text).min(1) })).min(1),
  }),
  trophies: z.object({ heading: text, items: z.array(text).min(1) }),
  offTheClock: z.object({ heading: text, items: z.array(text).min(1) }),
});

export type Image = z.infer<typeof imageSchema>;
export type Link = z.infer<typeof linkSchema>;
export type Stat = z.infer<typeof statSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Section = z.infer<typeof sectionSchema>;
export type Project = z.infer<typeof projectSchema> & { slug: string };
export type Experience = z.infer<typeof experienceSchema> & { slug: string };
export type Site = z.infer<typeof siteSchema>;
export type About = z.infer<typeof aboutSchema>;
