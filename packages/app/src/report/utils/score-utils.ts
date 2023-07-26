import { ScoreColor, ScoreColorKey } from "../fe-report-types";

export const resolveScoreColor = (score: number): ScoreColorKey => {
  if (numberInRange(score, 33.3, 66.6)) {
    return ScoreColor.Medium;
  } else if (numberInRange(score, 66.6, 100)) {
    return ScoreColor.High;
  }

  return ScoreColor.Low;
};

const numberInRange = (n: number, start: number, end: number) =>
  n >= start && n <= end;
