import { AnalysisStatus, ReportState } from "shared-types";
import { logger } from "../utils/logger";
import { Store, createStore } from "./store";
import { addStore } from "./stores-map";

export const createReportStore = (requestId: string) => {
  logger.stores.log(`Creating report store for requestId: "${requestId}"`);

  const reportStore = createStore<ReportState>({
    requestId,
    resourceType: undefined,
    resourceValue: undefined,
    status: AnalysisStatus.Created,
    linters: undefined,
    packages: undefined,
    repoDetails: undefined,
    fileDetails: undefined,
    score: 0,
    analysisError: undefined,
    code: undefined,
  });

  // save the store instance for later use
  addStore(requestId, reportStore);

  return reportStore;
};

export type InitialReportStoreState = Pick<
  ReportState,
  "requestId" | "status" | "score"
>;

export type ReportStore = Store<ReportState>;
