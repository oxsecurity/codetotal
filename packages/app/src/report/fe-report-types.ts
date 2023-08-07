import { OneOfValues, Severity } from "shared-types";

export enum ReportType {
  Detection,
  Details,
  Links,
}

export type ScoreColorKey = OneOfValues<typeof ScoreColor>;
export const ScoreColor = {
  High: "high",
  Medium: "medium",
  Low: "success",
} as const;

export interface Linter {
  name: string;
  errors: number;
  severity?: OneOfValues<typeof Severity>;
  status: "started" | "success" | "error";
}
