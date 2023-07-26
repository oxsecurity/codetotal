import { ProgrammingLanguage } from "./language-types";
import { OneOfValues } from "./typescript-types";

export interface Analysis {
  inputType: OneOfValues<typeof AnalysisType>;
}

export const AnalysisType = {
  File: "file",
  Repo: "repo",
  Snippet: "snippet",
} as const;

export interface RepoAnalysis extends Analysis {
  inputType: typeof AnalysisType.Repo;
  url: string;
}

export interface SnippetAnalysis extends Analysis {
  inputType: typeof AnalysisType.Snippet;
  snippet: string;
  language?: ProgrammingLanguage;
}

export interface FileAnalysis extends Analysis {
  inputType: typeof AnalysisType.File;
  // in the backend we use Multer, in the browser native File object
  file: File | Express.Multer.File;
}

export enum AnalysisStatus {
  Created = "created",
  Completed = "completed",
  NotFound = "not-found",
}
