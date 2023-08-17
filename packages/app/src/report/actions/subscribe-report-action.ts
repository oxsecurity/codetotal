import { AnalysisStatus, ReportState } from "@ct/shared-types";
import { ReportStore } from "../stores/fe-report-store";
import { subscribe } from "../utils/ws-client";

let unsubscribe: () => void;

export const subscribeToReportProgress = (requestId: string) => {
  // clear previous error
  ReportStore.setState({ wsError: undefined });

  unsubscribe = subscribe({
    requestId,
    onMessage: (msg: Partial<ReportState>) => {
      const completed = msg.status && msg.status === AnalysisStatus.Completed;
      const error = !!msg.analysisError;
      if (completed || error) {
        // close ws connection on completed/error
        unsubscribe();
      }
      ReportStore.setState({ ...msg });
    },
    onError: () => {
      ReportStore.setState({
        wsError: "Web socket connection error",
      });
    },
    onClose: () => {
      const { inProgress } = ReportStore.getState();
      inProgress &&
        ReportStore.setState({
          wsError: "Web socket connection closed while scanning",
        });
    },
  });
  ReportStore.setState({ unsubscribe });
};
