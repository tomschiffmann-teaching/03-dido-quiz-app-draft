import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";

function Probe() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="title">{t.appTitle}</span>
      <button onClick={() => setLocale("de")}>switch</button>
    </div>
  );
}

describe("LanguageContext", () => {
  it("defaults to English and toggles to German via setLocale", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    );
    expect(screen.getByTestId("locale").textContent).toBe("en");
    await user.click(screen.getByRole("button", { name: "switch" }));
    expect(screen.getByTestId("locale").textContent).toBe("de");
  });

  it("throws when useLanguage is used outside a provider", () => {
    const errorSpy = () => {};
    const original = console.error;
    console.error = errorSpy;
    try {
      expect(() => render(<Probe />)).toThrow(
        /useLanguage must be used within a LanguageProvider/
      );
    } finally {
      console.error = original;
    }
  });
});
