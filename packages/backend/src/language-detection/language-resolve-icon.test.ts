import { resolveIcon } from "./language-resolve-icon";

describe("language-resolve-icon", () => {
  test("resolve TypeScript Icon", () => {
    const icon = resolveIcon("TypeScript");
    expect(icon).toBe("original");
  });

  test("resolve Rust Icon", () => {
    const icon = resolveIcon("Rust");
    expect(icon).toBe("plain");
  });

  test("resolve Python Icon", () => {
    const icon = resolveIcon("Python");
    expect(icon).toBe("original");
  });

  test("resolveIcon return undefined when icon not found", () => {
    const name = resolveIcon("123");
    expect(name).toBe(undefined);
  });
});
