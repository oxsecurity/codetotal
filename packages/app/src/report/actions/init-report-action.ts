import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { AnalysisStatus } from "shared-types";
import config from "../../config";
import { ReportStore } from "../stores/fe-report-store";
import { subscribeToReportProgress } from "./subscribe-report-action";

export const initProgress = async (
  requestId: string,
  navigate: NavigateFunction
) => {
  try {
    const res = await axios.get(
      `http://${config.CODETOTAL_HTTP_HOST}:${config.CODETOTAL_HTTP_PORT}/report/${requestId}`
    );
    const { status } = res.data;

    switch (status) {
      case AnalysisStatus.Created:
        subscribeToReportProgress(requestId);
        navigate({ pathname: `/report/${requestId}` });
        break;
      case AnalysisStatus.NotFound:
        navigate("/");
        return;
    }

    ReportStore.setState(res.data);
  } catch (err) {
    console.error(err);
  }
};
