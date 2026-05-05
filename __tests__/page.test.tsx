import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { topics } from "@/data/quizzes";

describe("Home page", () => {
  it("renders the heading and subheading", () => {
    render(
      <LanguageProvider>
        <Home />
      </LanguageProvider>
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Pick a topic/i)).toBeInTheDocument();
  });

  it("renders a card for every topic", () => {
    render(
      <LanguageProvider>
        <Home />
      </LanguageProvider>
    );
    for (const topic of topics) {
      expect(screen.getByText(topic.name)).toBeInTheDocument();
    }
  });
});
