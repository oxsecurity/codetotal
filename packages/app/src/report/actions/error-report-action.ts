import { ReportStore } from "../stores/fe-report-store";

export const resetReport = () => {
  const { unsubscribe, reset } = ReportStore.getState();

  unsubscribe && unsubscribe();
  reset();
};
