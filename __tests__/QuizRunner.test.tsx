import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuizRunner from "@/components/QuizRunner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Topic } from "@/types/quiz";

const mockTopic: Topic = {
  id: "test",
  name: "Test Topic",
  description: "A test topic",
  icon: "T",
  questions: [
    {
      id: "q1",
      question: "What is 1 + 1?",
      options: ["One", "Two", "Three", "Four"],
      correctIndex: 1,
    },
    {
      id: "q2",
      question: "What is 2 + 2?",
      options: ["Two", "Three", "Four", "Five"],
      correctIndex: 2,
    },
  ],
};

function renderWithProvider(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe("QuizRunner", () => {
  it("renders the first question", () => {
    renderWithProvider(<QuizRunner topic={mockTopic} />);
    expect(screen.getByText("What is 1 + 1?")).toBeInTheDocument();
  });

  it("highlights selected answer", async () => {
    const user = userEvent.setup();
    renderWithProvider(<QuizRunner topic={mockTopic} />);

    const option = screen.getByRole("button", { name: "Two" });
    await user.click(option);
    expect(option).toHaveClass("border-blue-500");
  });

  it("navigates to next question", async () => {
    const user = userEvent.setup();
    renderWithProvider(<QuizRunner topic={mockTopic} />);

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
  });

  it("shows results after submitting all answers", async () => {
    const user = userEvent.setup();
    renderWithProvider(<QuizRunner topic={mockTopic} />);

    await user.click(screen.getByRole("button", { name: "Two" }));
    await user.click(screen.getByRole("button", { name: "Next" }));

    await user.click(screen.getByRole("button", { name: "Four" }));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Quiz Complete!")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("2 of 2 correct")).toBeInTheDocument();
  });

  it("shows incorrect answers in results", async () => {
    const user = userEvent.setup();
    renderWithProvider(<QuizRunner topic={mockTopic} />);

    await user.click(screen.getByRole("button", { name: "One" }));
    await user.click(screen.getByRole("button", { name: "Next" }));

    await user.click(screen.getByRole("button", { name: "Two" }));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText("0 of 2 correct")).toBeInTheDocument();
  });

  it("disables submit when not all questions are answered", async () => {
    const user = userEvent.setup();
    renderWithProvider(<QuizRunner topic={mockTopic} />);

    await user.click(screen.getByRole("button", { name: "Two" }));
    await user.click(screen.getByRole("button", { name: "Next" }));

    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });

  it("can retry after completing", async () => {
    const user = userEvent.setup();
    renderWithProvider(<QuizRunner topic={mockTopic} />);

    await user.click(screen.getByRole("button", { name: "Two" }));
    await user.click(screen.getByRole("button", { name: "Next" }));
    await user.click(screen.getByRole("button", { name: "Four" }));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await user.click(screen.getByRole("button", { name: "Retry" }));
    expect(screen.getByText("What is 1 + 1?")).toBeInTheDocument();
  });
});
