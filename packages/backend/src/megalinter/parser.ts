import { ReportStore } from "../stores/be-report-store";
import {
  BaseMessage,
  LinterCompleteMessage,
  MegalinterCompleteMessage,
  MegalinterErrorMessage,
  MegalinterStartMessage,
  MessageType,
} from "./megalinter-types";
import { parseDetails } from "./parsers/parse-details";
import { parseMegalinterError } from "./parsers/parse-errors";
import { parseLinterStatus } from "./parsers/parse-linter-status";
import { parseMegalinterComplete } from "./parsers/parse-megalinter-complete";
import { parseMegalinterStart } from "./parsers/parse-megalinter-start";
import { parseSarif } from "./parsers/parse-sarif";
import { parseSBOM } from "./parsers/parse-sbom";

export const parseMessage = (msg: BaseMessage, reportStore: ReportStore) => {
  console.log(msg);
  switch (msg.messageType) {
    case MessageType.MegalinterStart:
      parseMegalinterStart(msg as MegalinterStartMessage, reportStore);
      break;
    case MessageType.MegalinterComplete:
      parseMegalinterComplete(msg as MegalinterCompleteMessage, reportStore);

      break;
    case MessageType.LinterComplete:
      if (msg.isSBOM) {
        parseSBOM(msg as LinterCompleteMessage, reportStore);
      } else {
        runSarif(msg as LinterCompleteMessage, reportStore);
      }
      parseLinterStatus(msg as LinterCompleteMessage, reportStore);
      break;
    case MessageType.ServerError:
      parseMegalinterError(msg as MegalinterErrorMessage, reportStore);
      break;
  }

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
