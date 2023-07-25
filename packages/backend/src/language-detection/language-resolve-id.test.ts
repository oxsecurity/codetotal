import { resolveId } from "./language-resolve-id";
import { pyCodeSnippet, tsCodeSnippet } from "./snippets-mocks";

describe("language-resolve-id", () => {
  test("resolveId language id from snippet", async () => {
    const id = await resolveId(pyCodeSnippet);
    expect(id).toBe("py");
  });

  test("resolveId language id from snippet", async () => {
    const id = await resolveId(tsCodeSnippet);
    expect(id).toBe("ts");
  });

  test("resolveId return undefined when language not detected", async () => {
    const id = await resolveId("123");
    expect(id).toBeUndefined();
  });
});
