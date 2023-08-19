import { Analysis } from "@ct/shared-types";
import axios from "axios";
import config from "../config";
import { createReportStore } from "../stores/be-report-store";
import { logger } from "../utils/logger";
import { createAnalysisRequestData } from "./create-analysis-request";
import { subscribeToMegaLinter } from "./subscribe-to-megalinter";

export const createAnalysis = async (
  action: Analysis
): Promise<{ requestId: string }> => {
  try {
    const [data, reportState] = await createAnalysisRequestData(action);

    const response = await axios.post<{ request_id: string }>(
      config.MEGALINTER_ANALYSIS_URL,
      data
    );

    const requestId = response.data.request_id;
    const reportStore = createReportStore(requestId);
    reportStore.set(reportState);
    subscribeToMegaLinter(requestId, reportStore);
    return { requestId };
  } catch (err) {
    logger.actions.error(
      `Unable to send HTTP request to megalinter at: ${config.MEGALINTER_ANALYSIS_URL}`
    );
    throw err;
  }
};
