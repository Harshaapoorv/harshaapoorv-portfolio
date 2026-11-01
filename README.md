# harshaapoorv.com

My portfolio: a multi-page, pre-rendered React site where **every word, number and image comes from JSON** in [`content/`](content).

**Stack:** React 19 · React Router 7 (pre-rendered, no server) · TypeScript · Tailwind CSS 4 · Zod · EmailJS · Vitest · Playwright · Vercel

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # pre-renders every page into build/client
npm run preview      # serves the build on http://localhost:4173
```

Checks (all run in CI on every pull request):

```bash
npm run typecheck && npm run lint && npm test && npm run test:e2e
```

## Editing content (no code changes needed)

| To change… | Edit |
|---|---|
| Hero, stats, home sections, nav, socials, resumes, page intros | `content/site.json` |
| About page: story, character stats, journey, education, skills, awards | `content/about.json` |
| A project | `content/projects/<slug>.json` |
| A role | `content/experience/<slug>.json` |

### Add a project

1. Copy an existing file, e.g. `content/projects/calculator.json` → `content/projects/my-app.json`.
   The file name becomes the URL: `/projects/my-app`.
2. Put images in `assets-src/projects/my-app/` and run `npm run images`.
   They're converted to WebP in `public/images/projects/my-app/`; reference them as
   `/images/projects/my-app/<name>.webp`.
3. Set `"featured": true` to show it on the home page and `"order"` to position it.

That's it: the card, the filter chips, the detail page and its link preview are generated automatically.
Adding a role works the same way in `content/experience/`.

**Fields worth knowing**

- `categories`: any of `Mobile`, `Frontend`, `Backend`, `Full Stack`, `AI/ML` (drives the filters).
- `status`: `shipped`, `in-development` or `archived`.
- `cover` (optional): card image. Without one, the card shows `badge` as a comic stamp.
- `stats`: `{ "value", "label", "tone": "plain" | "yellow" | "blue" }`.
- `links`: `{ "label", "url", "primary": true }`. Site paths like `/experience/tcs` work too.
- `sections`: an ordered list of blocks, each with a `type`:
  `text` (paragraphs) · `cards` (title + text, `highlight` for yellow) · `metrics` (big value + text) ·
  `list` · `timeline` (date + text) · `gallery` (images; `"shape": "phone"` for screenshots).

If a file has a typo or a missing field, `npm run build` fails with a message naming the file and field,
so a broken page never reaches the live site. The schema lives in [`app/content/schema.ts`](app/content/schema.ts).

## Project structure

```
app/
  components/
    ui/        Buttons, chips, panels, stamps, speech bubbles, typography
    cards/     ProjectCard, ExperienceCard, StatCard, InfoCard, ChapterCard
    sections/  Hero pieces, stats grid, filters, detail-page layout, gallery, timeline, contact form
    layout/    Header, footer, resume menu, skip link
  content/     Loads and validates /content (schema.ts, index.ts)
  routes/      One file per page
  lib/         SEO tags, scroll reveal, EmailJS, helpers
content/       All site content (JSON)
assets-src/    Original images; `npm run images` writes optimized WebP to public/images
public/        Resumes, images, favicon, social preview image
tests/         unit (Vitest) and e2e (Playwright, desktop + phone)
```

## Contact form

Messages are sent with EmailJS (fields `name`, `email`, `message`). The public client keys can be overridden
with the variables in `.env.example`.

## Deploying

Vercel builds with `npm run build` and serves `build/client` (see `vercel.json`).
Every page is a static HTML file; unknown URLs get the custom 404 page.
