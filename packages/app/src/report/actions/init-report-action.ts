import { AnalysisStatus } from "@ct/shared-types";
import axios from "axios";
import { ApiUrl } from "../../common/utils/backend-url";
import { ReportStore } from "../stores/fe-report-store";
import { subscribeToReportProgress } from "./subscribe-report-action";

export const initReport = async (requestId: string) => {
  try {
    // fetch report
    const res = await axios.get(`${ApiUrl}/report/${requestId}`);

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
