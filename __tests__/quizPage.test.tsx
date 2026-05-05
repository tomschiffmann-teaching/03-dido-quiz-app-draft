import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import QuizPage from "@/app/quiz/[topicId]/page";
import { LanguageProvider } from "@/i18n/LanguageContext";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

function resolvedParams(topicId: string): Promise<{ topicId: string }> {
  const value = { topicId };
  const p = Promise.resolve(value) as Promise<typeof value> & {
    status: string;
    value: typeof value;
  };
  p.status = "fulfilled";
  p.value = value;
  return p;
}

describe("Quiz page", () => {
  it("renders the quiz for a valid topic id", () => {
    render(
      <LanguageProvider>
        <QuizPage params={resolvedParams("git")} />
      </LanguageProvider>
    );
    expect(screen.getByText(/Back to topics/i)).toBeInTheDocument();
  });

  it("calls notFound for an unknown topic id", () => {
    expect(() =>
      render(
        <LanguageProvider>
          <QuizPage params={resolvedParams("nope")} />
        </LanguageProvider>
      )
    ).toThrow(/NEXT_NOT_FOUND/);
  });
});
