import { fireEvent, render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "~/components/cards";
import { FilterChips } from "~/components/sections";
import { ResumeMenu } from "~/components/layout";
import { projects, site } from "~/content";

function renderInRouter(ui: React.ReactNode) {
  const Stub = createRoutesStub([{ path: "/", Component: () => ui }]);
  return render(<Stub initialEntries={["/"]} />);
}

describe("ProjectCard", () => {
  it("links the title to the project's page", async () => {
    const p = projects[0]!;
    renderInRouter(<ProjectCard project={p} />);
    const link = await screen.findByRole("link", { name: p.title });
    expect(link).toHaveAttribute("href", `/projects/${p.slug}`);
  });
});

describe("FilterChips", () => {
  it("marks the selected option and reports clicks", () => {
    let picked = "";
    render(
      <FilterChips
        label="Filter"
        options={["All", "Mobile"] as const}
        value="All"
        onChange={(v) => (picked = v)}
      />,
    );
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Mobile" }));
    expect(picked).toBe("Mobile");
  });
});

describe("ResumeMenu", () => {
  it("opens to show one link per resume and closes on Escape", () => {
    render(<ResumeMenu label="Resume" />);
    const button = screen.getByRole("button", { name: /resume/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("link")).toHaveLength(site.resumes.length);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
