import { describe, it, expect } from "vitest";
import translations from "@/i18n/translations";

describe("translations", () => {
  it("formats question count for English", () => {
    expect(translations.en.questionsCount(3)).toBe("3 questions");
  });

  it("formats question count for German", () => {
    expect(translations.de.questionsCount(5)).toBe("5 Fragen");
  });

  it("formats correct score for English", () => {
    expect(translations.en.correct(2, 4)).toBe("2 of 4 correct");
  });

  it("formats correct score for German", () => {
    expect(translations.de.correct(3, 7)).toBe("3 von 7 richtig");
  });

  it("provides topic descriptions in both locales", () => {
    expect(translations.en["topic.git.description"]).toMatch(/Version control/);
    expect(translations.de["topic.git.description"]).toMatch(/Versionskontrolle/);
  });
});
