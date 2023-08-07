import { LinterStatus } from "shared-types";
import { ReportStore } from "../../stores/be-report-store";
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
    const linters = msg.linters.filter(filterLinters).map((linter) => ({
      name: linter.linterId,
      errors: 0,
      severity: undefined,
      docUrl: linter.docUrl,
      status: linter.linterStatus || LinterStatus.Started,
    }));

    reportStore.set({ linters });
  }
};

// filter out linters with isSBOM (Megalinter requirment)
const filterLinters = (linter: RawLinter): boolean => !linter.isSBOM;
