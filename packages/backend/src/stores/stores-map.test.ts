import { ReportStore } from "./be-report-store";
import { addStore, getStore } from "./stores-map";

describe("stores-map", () => {
  test("add and get store by requestId", () => {
    addStore("123", { test: "123" } as unknown as ReportStore);
    expect(getStore("123")).toEqual({ test: "123" });
  });
});
