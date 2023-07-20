import { AnalysisType, ReportState } from "shared-types";
import { ReportStore } from "../../stores/be-report-store";
import { logger } from "../../utils/logger";
import { BaseMessage } from "../megalinter-types";
import fileDetailsMock from "../mocks/file-details.json";
import repoDetailsMock from "../mocks/repo-details.json";

const mock: ReportState["repoDetails"] = {
  ...repoDetailsMock,
  latestVersionDate: new Date(repoDetailsMock.latestVersionDate),
};

export const parseDetails = (_: BaseMessage, reportStore: ReportStore) => {
  const { resourceType, fileDetails, repoDetails } = reportStore.get();

  if (fileDetails || repoDetails) {
    return;
  }

  logger.megalinter.log(`parseDetails: resourceType: "${resourceType}"`);
  switch (resourceType) {
    case AnalysisType.File:
      reportStore.set({ fileDetails: fileDetailsMock });
      break;
    case AnalysisType.Repo:
      reportStore.set({ repoDetails: mock });
      break;
  }
};
