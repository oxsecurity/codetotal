import { allLanguages, detectLanguage } from "./language-detect";
import { pyCodeSnippet } from "./snippets-mocks";

describe("language-detect", () => {
  test("resolve language", async () => {
    const language = await detectLanguage(pyCodeSnippet);
    expect(language.id).toBe("py");
    expect(language.name).toBe("Python");
    expect(language.displayName).toBe("Python");
    expect(language.icon).toBe("original");
  });

  test("resolveId return undefined when language not detected", async () => {
    const language = await detectLanguage("");
    expect(language).toBeUndefined();
  });

  test("all-languages are sorted", () => {
    const all = allLanguages();
    expect(all.length).toBeGreaterThan(0);

    const first = all[0];
    const last = all[all.length - 1];
    expect(first.id).toBe("csharp");
    expect(last.id).toBe("ts");
  });
});
