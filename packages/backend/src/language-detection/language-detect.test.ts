import { detectLanguage } from "./language-detect";
import { tsCodeSnippet } from "./snippets-mocks";

describe("language-detect", () => {
  test("resolve language", async () => {
    const language = await detectLanguage(tsCodeSnippet);
    expect(language.id).toBeDefined();
    expect(language.name).toBeDefined();
    expect(language.icon).toBeDefined();
  });

  test("resolve language without an icon", async () => {
    const language = await detectLanguage("MKDIR mydir Set X=123");
    expect(language.id).toBeDefined();
    expect(language.name).toBeDefined();
    expect(language.icon).toBeUndefined();
  });

  test("resolveId return undefined when language not detected", async () => {
    const language = await detectLanguage("");
    expect(language).toBe(undefined);
  });
});
