// Vercel serves build/client/404.html for unknown URLs; copy the pre-rendered not-found page there.
import { copyFileSync, existsSync } from "node:fs";
const src = "build/client/404/index.html";
if (existsSync(src)) copyFileSync(src, "build/client/404.html");
