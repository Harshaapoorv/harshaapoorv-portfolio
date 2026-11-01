// Renders the default social-preview image (public/og/default.png) and the apple touch icon.
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";

const dataUri = (path, type) => `data:${type};base64,${readFileSync(resolve(path)).toString("base64")}`;
const font = (family, file) =>
  `@font-face{font-family:'${family}';src:url(${dataUri(file, "font/woff2")}) format('woff2');font-weight:100 900}`;
const fonts = [
  font("Bricolage Grotesque", "node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2"),
  font("DM Sans", "node_modules/@fontsource/dm-sans/files/dm-sans-latin-500-normal.woff2"),
  font("JetBrains Mono", "node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2"),
  font("Bangers", "node_modules/@fontsource/bangers/files/bangers-latin-400-normal.woff2"),
].join("");
const html = readFileSync("scripts/og-template.html", "utf8")
  .replace(/<link[^>]+fonts.googleapis[^>]+>/, `<style>${fonts}</style>`)
  .replace("AVATAR", dataUri("public/images/brand/avatar.webp", "image/webp"));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" }).catch(() => {});
await page.screenshot({ path: "public/og/default.png" });
await browser.close();
await sharp("public/favicon.svg", { density: 600 }).resize(180, 180).flatten({ background: "#ffffff" }).png().toFile("public/apple-touch-icon.png");
console.log("done");
