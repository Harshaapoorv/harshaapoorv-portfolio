import type { Config } from "@react-router/dev/config";
import { readdirSync } from "node:fs";

/** Slugs come from the file names in content/, so a new JSON file = a new pre-rendered page. */
const slugs = (dir: string) =>
  readdirSync(new URL(`./content/${dir}/`, import.meta.url))
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));

export default {
  ssr: false,
  async prerender() {
    return [
      "/",
      "/about",
      "/experience",
      "/projects",
      "/contact",
      "/404",
      ...slugs("projects").map((s) => `/projects/${s}`),
      ...slugs("experience").map((s) => `/experience/${s}`),
    ];
  },
} satisfies Config;
