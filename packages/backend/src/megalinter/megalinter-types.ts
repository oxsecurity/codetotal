import { AnalysisStatus, LinterStatus } from "shared-types";

export enum MessageType {
  MegalinterStart = "megalinterStart",
  LinterStart = "linterStart",
  LinterComplete = "linterComplete",
  MegalinterComplete = "megalinterComplete",
  SBOMPackages = "sbom-packages",
  FileDetails = "file-details",
  RepoDetails = "repo-details",
  ServerError = "serverError",
}

export interface BaseMessage {
  messageType: MessageType;
  isSBOM: boolean;
}

export interface MegalinterStartMessage extends BaseMessage {
  messageType: typeof MessageType.MegalinterStart;
  megaLinterStatus: AnalysisStatus;
  linters: RawLinter[];
}

export interface MegalinterCompleteMessage extends BaseMessage {
  messageType: typeof MessageType.MegalinterComplete;
  megaLinterStatus: AnalysisStatus;
  requestId: string;
}

export interface LinterStartMessage extends BaseMessage {
  messageType: typeof MessageType.LinterStart;
  linterStatus: LinterStatus;
  descriptorId: string;
  linterId: string;
  linterKey: string;
  linterVersion: string;
  linterCliLintMode: unknown; // TODO: itay: ask Nicolas
  requestId: string;
  docUrl: string;
  isFormatter: boolean;
  isSBOM: boolean;
  filesNumber: number;
}

export interface LinterCompleteMessage extends BaseMessage {
  messageType: typeof MessageType.LinterComplete;
  linterId: string;
  linterStatus: LinterStatus;
  linterErrorNumber: number;
  linterStatusMessage: string;
  linterElapsedTime: number;
  linterCliCommand: string[];
  descriptorId: string;
  linterKey: string;
  linterVersion: string;
  linterCliLintMode: string;
  requestId: string;
  docUrl: string;
  isFormatter: boolean;
  isSBOM: boolean;
  outputJson?: unknown;
  outputSarif: {
    $schema: string;
    runs: [
      {
        columnKind: string;
        originalUriBaseIds: {
          ROOTPATH: {
            uri: string;
          };
        };
        properties: {
          megalinter: {
            docUrl: string;
            linterKey: string;
            linterVersion: string;
            sbom?: unknown;
          };
        };
        results: [];
        tool: {
          driver: {
            fullName: string;
            informationUri: string;
            name: string;
            rules: unknown[];
            version: string;
          };
        };
      }
    ];
    version: string;
  };
}

export interface MegalinterErrorMessage extends BaseMessage {
  messageType: typeof MessageType.ServerError;
  message: string;
  errorCode: MegalinterErrorCode;
  errorDetails: {
    error: string;
  };
  requestId: string;
}

export enum MegalinterErrorCode {
  MissingAnalysisType = "missingAnalysisType",
  GitClone = "gitCloneError",
  UploadFileNotFound = "uploadedFileNotFound",
  SnippetGuessError = "snippetGuessError",
  SnippetBuildError = "snippetBuildError",
}

export interface RawLinter {
  descriptorId: string;
  linterId: string;
  linterKey: string;
  linterVersion: string;
  linterCliLintMode: string;
  requestId: string;
  docUrl: string;
  isFormatter: boolean;
  isSBOM: boolean;
  filesNumber: number;
  linterStatus: LinterStatus;
}
