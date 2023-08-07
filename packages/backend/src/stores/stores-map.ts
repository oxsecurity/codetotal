import { ReportStore } from "./be-report-store";

const storesMap = new Map<string, ReportStore>();

export const addStore = (requestId: string, store: ReportStore) => {
  storesMap.set(requestId, store);
};

export const getStore = (requestId: string) => {
  return storesMap.get(requestId);
};
