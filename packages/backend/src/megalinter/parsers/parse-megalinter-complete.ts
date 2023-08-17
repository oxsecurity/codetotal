import { AnalysisStatus } from "@ct/shared-types";
import { ReportStore } from "../../stores/be-report-store";
import { MegalinterCompleteMessage } from "../megalinter-types";

export const parseMegalinterComplete = (
  msg: MegalinterCompleteMessage,
  reportStore: ReportStore
) => {
  const { megaLinterStatus } = msg;
  if (
    megaLinterStatus === AnalysisStatus.Created ||
    megaLinterStatus === AnalysisStatus.Completed
  ) {
    reportStore.set({ status: megaLinterStatus });
  }
};
