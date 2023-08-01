import axios from "axios";
import { AnalysisStatus } from "shared-types";
import config from "../../config";
import { ReportStore } from "../stores/fe-report-store";
import { subscribeToReportProgress } from "./subscribe-report-action";

export const initReport = async (requestId: string) => {
  try {
    // reset report store
    ReportStore.getState().reset();

    // fetch report
    const res = await axios.get(
      `http://${config.CODETOTAL_HTTP_HOST}:${config.CODETOTAL_HTTP_PORT}/report/${requestId}`
    );

    const { status } = res.data;
    switch (status) {
      case AnalysisStatus.Created:
        subscribeToReportProgress(requestId);
        break;
      case AnalysisStatus.NotFound:
        return false;
    }

    ReportStore.setState(res.data);
    return true;
  } catch (err) {
    console.error(err);
  }
};
