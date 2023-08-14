import { ReportStore } from "../stores/fe-report-store";

export const clearReport = () => {
  const { unsubscribe, reset } = ReportStore.getState();
  // unsubscribe from updates
  unsubscribe && unsubscribe();

  // reset state
  reset();
};
