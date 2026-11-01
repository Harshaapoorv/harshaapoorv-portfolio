import type { Route } from "./+types/not-found";
import { NotFound } from "~/root";
import { site } from "~/content";
import { seo } from "~/lib/seo";

export const meta: Route.MetaFunction = () => [
  ...seo({ title: "Page not found", path: "/404" }),
  { name: "robots", content: "noindex" },
];

export default function NotFoundRoute() {
  return <NotFound heading={site.pages.notFound.heading} text={site.pages.notFound.text} />;
}
