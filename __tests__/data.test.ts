import { describe, it, expect } from "vitest";
import { topics, getTopicById, getAllTopicIds } from "@/data/quizzes";

describe("Quiz data", () => {
  it("has at least one topic", () => {
    expect(topics.length).toBeGreaterThan(0);
  });

  it("every topic has a unique id", () => {
    const ids = topics.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every topic has at least one question", () => {
    for (const topic of topics) {
      expect(topic.questions.length).toBeGreaterThan(0);
    }
  });

  it("every question has exactly 4 options", () => {
    for (const topic of topics) {
      for (const q of topic.questions) {
        expect(q.options).toHaveLength(4);
      }
    }
  });

  it("every question has a valid correctIndex", () => {
    for (const topic of topics) {
      for (const q of topic.questions) {
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
      }
    }
  });

  it("getTopicById returns the correct topic", () => {
    const topic = getTopicById("git");
    expect(topic).toBeDefined();
    expect(topic!.name).toBe("Git");
  });

  it("getTopicById returns undefined for unknown id", () => {
    expect(getTopicById("nonexistent")).toBeUndefined();
  });

  it("getAllTopicIds returns all ids", () => {
    const ids = getAllTopicIds();
    expect(ids).toHaveLength(topics.length);
    expect(ids).toContain("git");
    expect(ids).toContain("terraform");
  });
});
