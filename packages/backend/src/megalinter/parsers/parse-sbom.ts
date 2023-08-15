import { SbomPackage } from "shared-types";
import { fetchPackages } from "../../sbom/sbom-fetching-utils";
import { Component, Dependency } from "../../sbom/sbom-types";
import {
  extractMappingForApplication,
  getPackages,
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
      console.log("parsing sbom...");

      const components = msg.outputSarif.runs[0].properties.megalinter.sbom
        .components as Component[];
      const dependencies = msg.outputSarif.runs[0].properties.megalinter.sbom
        .dependencies as Dependency[];
      const applications = extractMappingForApplication(components);
      const pkgsInfo = await fetchPackages(dependencies, components);
      const sbomPackages: SbomPackage[] = await getPackages(
        dependencies,
        components,
        applications,
        pkgsInfo
      );
      if (sbomPackages && sbomPackages.length > 0) {
        reportStore.set({ packages: sbomPackages });
      }
    }
  }
};
