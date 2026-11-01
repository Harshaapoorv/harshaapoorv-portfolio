// Converts every image in assets-src/ to a resized WebP in public/images/ (same relative path).
// Run `npm run images` after adding a new image to assets-src/.
import { readdirSync, mkdirSync, statSync } from "node:fs";
import { join, dirname, relative, extname } from "node:path";
import sharp from "sharp";

const SRC = "assets-src";
const OUT = "public/images";
const MAX_WIDTH = 1600;

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

for (const file of walk(SRC)) {
  if (![".png", ".jpg", ".jpeg", ".webp"].includes(extname(file).toLowerCase())) continue;
  const out = join(OUT, relative(SRC, file)).replace(/\.(png|jpe?g|webp)$/i, ".webp");
  mkdirSync(dirname(out), { recursive: true });
  const { width = 0, height = 0 } = await sharp(file).metadata();
  // Tall phone screenshots are shown small, so they don't need desktop-banner resolution.
  const max = height > width * 1.5 ? { width: 480 } : { width: MAX_WIDTH, height: MAX_WIDTH, fit: "inside" };
  const info = await sharp(file)
    .resize({ ...max, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
