import { ReportStore } from "../../stores/be-report-store";
import { logger } from "../../utils/logger";
import { MegalinterErrorMessage } from "../megalinter-types";

export const parseMegalinterError = (
  msg: MegalinterErrorMessage,
  reportStore: ReportStore
) => {
  try {
    const { errorCode, message, errorDetails } = msg;
    const analysisError = {
      errorCode,
      errorMessage: message,
      errorDetails: errorDetails.error,
    };
    reportStore.set({
      analysisError,
    });
  } catch (err) {
    logger.megalinter.error(err);
    throw new Error("Unable to parse megalinter error message");
  }
};
