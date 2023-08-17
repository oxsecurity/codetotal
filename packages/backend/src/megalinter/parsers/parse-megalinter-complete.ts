import { AnalysisStatus } from "@ct/shared-types";
import { ReportStore } from "../../stores/be-report-store";
import { logger } from "../../utils/logger";
import { MegalinterCompleteMessage } from "../megalinter-types";

export const parseMegalinterComplete = (
  msg: MegalinterCompleteMessage,
  reportStore: ReportStore
) => {
  const { megaLinterStatus } = msg;

  switch (megaLinterStatus) {
    case AnalysisStatus.Created:
      if (megaLinterStatus === AnalysisStatus.Created) {
        reportStore.set({ status: megaLinterStatus });
      }
      break;
    case AnalysisStatus.Completed:
      if (reportStore.get().fetchingSBOMPackages) {
        logger.megalinter.log(
          "Megalinter completed, waiting for SBOM packages to complete"
        );
        reportStore.subscribe((state) => {
          if (state.fetchingSBOMPackages === false) {
            reportStore.set({ status: AnalysisStatus.Completed });
          }
        });
      } else {
        reportStore.set({ status: AnalysisStatus.Completed });
      }
      break;
    // error status is handled by a different parser
  }
};
