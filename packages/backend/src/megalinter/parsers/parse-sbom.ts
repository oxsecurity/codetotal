import { SbomPackage } from "@ct/shared-types";
import { fetchPackages } from "../../sbom/sbom-fetching-utils";
import { Component, Dependency } from "../../sbom/sbom-types";
import {
  createSBOMPackages,
  extractMappingForApplication,
} from "../../sbom/sbom-utils";
import { ReportStore } from "../../stores/be-report-store";
import { LinterCompleteMessage } from "../megalinter-types";

export const parseSBOM = async (
  msg: LinterCompleteMessage,
  reportStore: ReportStore
) => {
  const { packages } = reportStore.get();
  if (!packages) {
    if (
      msg?.outputSarif?.runs &&
      msg?.outputSarif?.runs.length > 0 &&
      msg.outputSarif.runs[0]?.properties?.megalinter?.sbom
    ) {
      reportStore.set({ fetchingSBOMPackages: true });
      console.log("parsing sbom...");

      const components = msg.outputSarif.runs[0].properties.megalinter.sbom
        .components as Component[];
      const dependencies = msg.outputSarif.runs[0].properties.megalinter.sbom
        .dependencies as Dependency[];
      const applications = extractMappingForApplication(components);
      const rawPackages = await fetchPackages(dependencies, components);
      const sbomPackages: SbomPackage[] = createSBOMPackages(
        dependencies,
        components,
        applications,
        rawPackages
      );
      if (sbomPackages && sbomPackages.length > 0) {
        reportStore.set({ packages: sbomPackages });
      }
      reportStore.set({ fetchingSBOMPackages: false });
    }
  }
};
