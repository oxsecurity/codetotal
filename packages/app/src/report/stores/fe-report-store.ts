import { AnalysisStatus, ReportState } from "shared-types";
import { createStore, useStore } from "zustand";
import { ScoreColorKey } from "../fe-report-types";
import { resolveScoreColor } from "../utils/score-utils";

const initialState: InitialState = {
  status: AnalysisStatus.Created,
  linters: [],
  selectedLinterName: undefined,
  packages: [],
  score: 0,
  inProgress: true,
  resourceType: undefined,
  resourceValue: undefined,
  unsubscribe: undefined,
  repoDetails: undefined,
  fileDetails: undefined,
  wsError: undefined,
  analysisError: undefined,
};

export const ReportStore = createStore<FeReportStoreState>((set, get) => ({
  ...initialState,
  issuesCount: (linterName: string): number => {
    const { linters = [] } = get();
    const linter = linters.find((linter) => linter.name === linterName);

    if (linter && linter.issues) {
      return linter.issues.length;
    }
    return 0;
  },
  scoreColor: (): ScoreColorKey => {
    const { score } = get();
    return resolveScoreColor(score);
  },
  lintersWithIssues: (): number => {
    const { linters = [] } = get();
    const filtered = linters.filter(
      (linter) => linter.issues && linter.issues.length > 0
    );
    return filtered.length;
  },
  lintersCompleted: (): number => {
    const { linters } = get();
    return (linters || []).filter(({ status }) => status !== "started").length;
  },
  progress: (): number => {
    const { lintersCompleted, linters } = get();
    return lintersCompleted() > 0
      ? Math.ceil((lintersCompleted() / (linters || []).length) * 100)
      : 0;
  },
  reset: () => {
    set({ ...initialState });
  },
}));

ReportStore.subscribe((next, prev) => {
  if (next.analysisError !== prev.analysisError) {
    console.log("analysis error has been set");
    console.log(next);
  }

  // console.log("report store updated");
  // console.log(state);
});

export const useReportStore = () => useStore(ReportStore);

type InitialState = Omit<
  FeReportStoreState,
  | "issuesCount"
  | "scoreColor"
  | "lintersWithIssues"
  | "reset"
  | "lintersCompleted"
  | "progress"
>;

interface FeReportStoreState extends ReportState {
  selectedLinterName?: string;
  inProgress: boolean;
  wsError?: string;
  issuesCount(toolName: string): number;
  unsubscribe?: () => void;
  scoreColor(): ScoreColorKey;
  lintersWithIssues(): number;
  lintersCompleted(): number;
  progress(): number;
  reset(): void;
}
