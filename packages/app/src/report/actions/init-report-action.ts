import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { AnalysisStatus } from "shared-types";
import config from "../../config.json";
import { ReportStore } from "../stores/fe-report-store";
import { subscribeToLintProgress } from "./subscribe-report-action";

export const initProgress = async (
  requestId: string,
  navigate: NavigateFunction
) => {
  try {
    const res = await axios.get(`${config.backendUrl}/report/${requestId}`);
    const { status } = res.data;

    switch (status) {
      case AnalysisStatus.Created:
        subscribeToLintProgress(requestId);
        break;
      case AnalysisStatus.Completed:
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
