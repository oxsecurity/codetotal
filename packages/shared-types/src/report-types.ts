import { ProgrammingLanguage } from ".";
import { AnalysisStatus } from "./analysis-types";
import { OneOfValues } from "./typescript-types";

export interface ReportState {
  requestId?: string;
  resourceType?: string;
  resourceValue?: string;
  status?: AnalysisStatus;
  linters?: Linter[];
  packages: SbomPackage[];
  repoDetails?: RepoDetails;
  fileDetails?: FileDetails;
  score: number;
  analysisError?: {
    errorCode?: string;
    errorMessage?: string;
    errorDetails?: string;
  };
  language?: ProgrammingLanguage;
  code?: string;
}

export interface RepoDetails {
  languages: ReportLanguage[];
  readmeUrl: string;
  license: string;
  activityUrl: string;
  stars: number;
  watching: number;
  forks: number;
  releases: number;
  latestVersion: string;
  latestVersionDate: Date;
}

export interface ReportLanguage {
  name: string;
  percentage: number;
}

export interface FileDetails {
  language: string;
  fileSize: number;
  md5: string; // DevSkim: ignore DS126858
  ssdeep: string;
  encoding: string;
}

export interface Linter {
  name: string;
  errors: number;
  severity?: OneOfValues<typeof Severity>;
  status: LinterStatus;
  issues?: Issue[];
  docUrl: string;
  logoUrl: string;
}

export enum LinterStatus {
  Started = "started",
  Success = "success",
  Error = "error",
}

export const Severity = {
  Critical: "critical",
  High: "high",
  Medium: "medium",
  Low: "low",
  Clean: "clean",
} as const;

export interface Issue {
  location: string;
  lineNumber: number;
  title: string;
  severity: OneOfValues<typeof Severity>;
  ruleId: string;
}

export interface SbomPackage {
  packageName: string;
  packageVersion: string;
  license: string;
  registry: string;
  severity: OneOfValues<typeof Severity>;
  filePath: string;
}
