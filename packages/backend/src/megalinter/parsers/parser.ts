import { ReportStore } from "../../stores/be-report-store";
import {
  BaseMessage,
  LinterCompleteMessage,
  MegalinterCompleteMessage,
  MegalinterStartMessage,
  MessageType,
} from "../megalinter-types";
import { parseDetails } from "./parse-details";
import { parseLinterStatus } from "./parse-linter-status";
import { parseMegalinterComplete } from "./parse-megalinter-complete";
import { parseMegalinterStart } from "./parse-megalinter-start";
import { parseSarif } from "./parse-sarif";
import { parsePackages } from "./parse-sbom-packages";

export const parseMessage = (msg: BaseMessage, reportStore: ReportStore) => {
  switch (msg.messageType) {
    case MessageType.MegalinterStart:
      parseMegalinterStart(msg as MegalinterStartMessage, reportStore);
      break;
    case MessageType.MegalinterComplete:
      parseMegalinterComplete(msg as MegalinterCompleteMessage, reportStore);
      break;
    case MessageType.LinterComplete:
      parseLinterStatus(msg as LinterCompleteMessage, reportStore);
      runSarif(msg as LinterCompleteMessage, reportStore);
      break;
  }

  parsePackages(msg, reportStore);
  parseDetails(msg, reportStore);
};

const runSarif = (msg: LinterCompleteMessage, reportStore: ReportStore) => {
  if (msg.outputSarif || msg.outputJson) {
    const sarifResults = parseSarif(msg);

    if (sarifResults.issues) {
      const { linters } = reportStore.get();
      const linter = linters.find((linter) => linter.name === msg.linterId);
      if (linter) {
        linter.issues = sarifResults.issues;
        linter.severity = sarifResults.severity;
      }
      reportStore.set({ linters: [...linters] });
    }
    if (
      sarifResults.score > 0 &&
      sarifResults.score > reportStore.get().score
    ) {
      reportStore.set({ score: sarifResults.score });
    }
  }
};
