import { AnalysisStatus } from "shared-types";
import { createReportStore } from "./be-report-store";
import { getStore } from "./stores-map";

describe("report-store", () => {
  test("Create store with initial state", () => {
    const reportStore = createReportStore("123");
    expect(getStore("123").get().requestId).toEqual("123");
    expect(getStore("123").get().status).toEqual(AnalysisStatus.Created);
    expect(getStore("123").get().score).toEqual(0);
    expect(getStore("123")).toEqual(reportStore);
  });
});
