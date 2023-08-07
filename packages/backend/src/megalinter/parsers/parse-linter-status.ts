import { ReportStore } from "../../stores/be-report-store";
import { LinterCompleteMessage } from "../megalinter-types";

export const parseLinterStatus = (
  msg: LinterCompleteMessage,
  reportStore: ReportStore
) => {
  const { linterStatus, linterId } = msg;
  const { linters } = reportStore.get();
  const linter = linters.find((linter) => linter.name === linterId);
  if (linter) {
    linter.status = linterStatus;
    reportStore.set({ linters: [...linters] });
  }

  return linter;
};
