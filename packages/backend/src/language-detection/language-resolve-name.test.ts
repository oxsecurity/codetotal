import { resolveName } from "./language-resolve-name";

describe("language-resolve-name", () => {
  test("resolveName", () => {
    const name = resolveName("ts");
    expect(name).toBe("TypeScript");
  });

  test("resolveName return undefined when language not found", () => {
    const name = resolveName("123");
    expect(name).toBeUndefined();
  });
});
