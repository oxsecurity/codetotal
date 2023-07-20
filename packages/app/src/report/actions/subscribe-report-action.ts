import { AnalysisStatus, ReportState } from "shared-types";
import { subscribe } from "../../ws-client";
import { ReportStore } from "../stores/fe-report-store";

export const subscribeToLintProgress = (requestId: string) => {
  console.log("subscribing to WS...");
  // clear previous error
  ReportStore.setState({ subscriptionError: undefined });

  const unsubscribe = subscribe(
    requestId,
    (msg: Partial<ReportState>) => {
      if (msg.status && msg.status === AnalysisStatus.Completed) {
        unsubscribe();
      }
      ReportStore.setState({ ...msg });
    },
    () => {
      ReportStore.setState({
        subscriptionError: "Web socket connection error",
      });
    },
    () => {
      const { inProgress } = ReportStore.getState();
      inProgress &&
        ReportStore.setState({
          subscriptionError: "Web socket connection closed while scanning",
        });
    }
  );
  ReportStore.setState({ unsubscribe });
};
