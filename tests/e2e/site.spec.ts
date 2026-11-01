import { expect, test } from "@playwright/test";
import { readdirSync } from "node:fs";

const slugs = (dir: string) => readdirSync(`content/${dir}`).map((f) => f.replace(/\.json$/, ""));
const routes = [
  "/", "/about", "/experience", "/projects", "/contact",
  ...slugs("projects").map((s) => `/projects/${s}`),
  ...slugs("experience").map((s) => `/experience/${s}`),
];

for (const path of routes) {
  test(`${path} renders without errors or sideways scroll`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/Harsha/);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test("unknown pages show the 404 panel", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("missing");
});

test("project filters narrow the list and update the URL", async ({ page }) => {
  await page.goto("/projects");
  const cards = page.locator("main ul > li article");
  const all = await cards.count();
  await page.getByRole("button", { name: /^AI\/ML/ }).click();
  await expect(page).toHaveURL(/type=AI%2FML|type=AI\/ML/);
  expect(await cards.count()).toBeLessThan(all);
});

test("contact form requires its fields before sending", async ({ page }) => {
  let sent = false;
  await page.route("**/api.emailjs.com/**", (r) => { sent = true; return r.fulfill({ status: 200, body: "OK" }); });
  await page.goto("/contact");
  await page.getByRole("button", { name: /send it my way/i }).click();
  expect(sent).toBe(false);
  await page.getByLabel("Your name").fill("Test Recruiter");
  await page.getByLabel("Your email").fill("recruiter@example.com");
  await page.getByLabel("What's on your mind?").fill("Hello there, this is a test message.");
  await page.getByRole("button", { name: /send it my way/i }).click();
  await expect(page.getByRole("status")).toContainText("Message sent");
  expect(sent).toBe(true);
});

test("phone menu opens and navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "phone only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.locator("#mobile-menu").getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
});
