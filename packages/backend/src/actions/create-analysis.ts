import axios from "axios";
import { Analysis } from "shared-types";
import config from "../config.json";
import { createReportStore } from "../stores/be-report-store";
import { createAnalysisRequestData } from "./create-analysis-request";
import { subscribeToMegaLinter } from "./subscribe-to-megalinter";
import { logger } from "../utils/logger";

export const createAnalysis = async (
  action: Analysis
): Promise<{ requestId: string }> => {
  try {
    const [data, resourceValue] = await createAnalysisRequestData(action);

    const response = await axios.post<{ request_id: string }>(
      config.megalinterHttpURL,
      data
    );

    const requestId = response.data.request_id;
    const reportStore = createReportStore(requestId);
    reportStore.set({
      resourceType: action.inputType,
      resourceValue,
    });
    subscribeToMegaLinter(requestId, reportStore);
    return { requestId };
  } catch (err) {
    logger.actions.error(
      `Unable to send HTTP request to megalinter at: ${config.megalinterHttpURL}`
    );
    throw err;
  }
};
