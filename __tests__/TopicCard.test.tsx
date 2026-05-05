import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TopicCard from "@/components/TopicCard";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Topic } from "@/types/quiz";

const mockTopic: Topic = {
  id: "git",
  name: "Git",
  description: "fallback description",
  icon: "G",
  questions: [
    {
      id: "q1",
      question: "Q?",
      options: ["a", "b", "c", "d"],
      correctIndex: 0,
    },
    {
      id: "q2",
      question: "Q2?",
      options: ["a", "b", "c", "d"],
      correctIndex: 1,
    },
  ],
};

const unknownTopic: Topic = {
  ...mockTopic,
  id: "unknown-topic",
  name: "Unknown",
};

describe("TopicCard", () => {
  it("renders topic name and translated description", () => {
    render(
      <LanguageProvider>
        <TopicCard topic={mockTopic} />
      </LanguageProvider>
    );
    expect(screen.getByText("Git")).toBeInTheDocument();
    expect(
      screen.getByText(/Version control fundamentals/i)
    ).toBeInTheDocument();
  });

  it("renders the question count", () => {
    render(
      <LanguageProvider>
        <TopicCard topic={mockTopic} />
      </LanguageProvider>
    );
    expect(screen.getByText("2 questions")).toBeInTheDocument();
  });

  it("links to the quiz page", () => {
    render(
      <LanguageProvider>
        <TopicCard topic={mockTopic} />
      </LanguageProvider>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/quiz/git");
  });

  it("falls back to topic.description for unknown topic ids", () => {
    render(
      <LanguageProvider>
        <TopicCard topic={unknownTopic} />
      </LanguageProvider>
    );
    expect(screen.getByText("fallback description")).toBeInTheDocument();
  });
});
