import { LinterStatus } from "@ct/shared-types";
import { ReportStore } from "../../stores/be-report-store";
import { logger } from "../../utils/logger";
import {
  MegalinterStartMessage,
  MessageType,
  RawLinter,
} from "../megalinter-types";

export const parseMegalinterStart = (
  msg: MegalinterStartMessage,
  reportStore: ReportStore
) => {
  if (msg.messageType === MessageType.MegalinterStart) {
    const linters = msg.linters.filter(filterLinters).map((linter) => {
      if (!linter.iconPngUrl) {
        logger.megalinter.error(
          `Missing "iconPngUrl" for:  ${linter.linterId}`
        );
      }
      return {
        name: linter.linterId,
        errors: 0,
        severity: undefined,
        docUrl: linter.docUrl,
        status: linter.linterStatus || LinterStatus.Started,
        logoUrl: linter.iconPngUrl,
      };
    });

    reportStore.set({ linters });
  }
};

// filter out linters with isSBOM (Megalinter requirment)
const filterLinters = (linter: RawLinter): boolean => !linter.isSBOM;
