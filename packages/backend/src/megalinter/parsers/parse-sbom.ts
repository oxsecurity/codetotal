import { SbomPackage } from "shared-types";
import { ReportStore } from "../../stores/be-report-store";
import { BaseMessage } from "../megalinter-types";
import packagesMock from "../mocks/sbom-packages.json";

export const parseSBOM = (_: BaseMessage, reportStore: ReportStore) => {
  const { packages } = reportStore.get();
  if (!packages) {
    reportStore.set({ packages: packagesMock.packages as SbomPackage[] });
  }
};
