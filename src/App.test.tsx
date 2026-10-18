import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("App command copy", () => {
  const originalClipboard = navigator.clipboard;

  afterEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: originalClipboard,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  it("copies the currently generated command to the clipboard", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith("soroban-testkit coverage . --format html --open"),
    );
    expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument();
  });

  it("copies the command for the selected tab, not the default one", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "audit" }));
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith("soroban-testkit audit . --strict"),
    );
  });

  it("still copies successfully when the browser has no Clipboard API", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
    });
    const execCommand = vi.fn().mockReturnValue(true);
    document.execCommand = execCommand;

    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    await waitFor(() => expect(execCommand).toHaveBeenCalledWith("copy"));
    expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument();
  });
});

describe("Light theme variant (#202)", () => {
  it("defaults to dark theme and toggles to light theme with high contrast", () => {
    const { container } = render(<App />);
    const main = container.querySelector("main");
    expect(main).toHaveAttribute("data-theme", "dark");

    const toggleButton = screen.getByRole("button", {
      name: "Switch to light theme",
    });
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(main).toHaveAttribute("data-theme", "light");
    expect(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    ).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(main).toHaveAttribute("data-theme", "dark");
  });
});

describe("Module card keyboard focus and accessibility (#191)", () => {
  it("makes each module card keyboard focusable with descriptive accessible labels", () => {
    render(<App />);
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(7);

    articles.forEach((article) => {
      expect(article).toHaveAttribute("tabindex", "0");
      expect(article).toHaveAttribute("aria-label");
    });

    const firstCard = articles[0];
    firstCard.focus();
    expect(document.activeElement).toBe(firstCard);
  });
});

describe("Section rhythm and page structure (#192)", () => {
  it("renders all page sections in a consistent vertical rhythm", () => {
    const { container } = render(<App />);

    const hero = container.querySelector("section.hero#top");
    const modules = container.querySelector("section.modules#modules");
    const commands = container.querySelector("section.commands#commands");
    const footer = container.querySelector("footer");

    expect(hero).toBeInTheDocument();
    expect(modules).toBeInTheDocument();
    expect(commands).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});
