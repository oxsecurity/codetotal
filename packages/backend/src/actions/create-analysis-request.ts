import {
  Analysis,
  AnalysisType,
  FileAnalysis,
  RepoAnalysis,
  ReportState,
  SnippetAnalysis,
} from "@ct/shared-types";
import axios from "axios";
import FormData from "form-data";
import md5 from "md5"; // DevSkim: ignore DS126858
import config from "../config";
import { detectLanguage } from "../language-detection/language-detect";
import { logger } from "../utils/logger";

export const createAnalysisRequestData = async (
  action: Analysis
): Promise<[unknown, Partial<ReportState>]> => {
  switch (action.inputType) {
    case AnalysisType.Repo: {
      return [
        { repositoryUrl: (<RepoAnalysis>action).url },
        {
          resourceType: AnalysisType.Repo,
          resourceValue: (<RepoAnalysis>action).url,
        },
      ];
    }
    case AnalysisType.Snippet: {
      const snippetMd5 = md5((<SnippetAnalysis>action).snippet); // DevSkim: ignore DS126858
      const snippetAction = action as SnippetAnalysis;
      const languageId = snippetAction.language?.id;
      const snippetExtension = languageId ? `.${languageId}` : undefined;
      return [
        {
          snippet: snippetAction.snippet,
          snippetExtension,
        },
        {
          resourceType: AnalysisType.Snippet,
          resourceValue: snippetMd5, // DevSkim: ignore DS126858
          language: snippetAction.language,
          code: snippetAction.snippet,
        },
      ];
    }
    case AnalysisType.File: {
      try {
        const fileAction = action as FileAnalysis;
        const file = fileAction.file as Express.Multer.File;
        const code = file.buffer.toString();
        const language = await detectLanguage(code);
        const form = new FormData();
        form.append("file", file.buffer, {
          filename: file.originalname,
          contentType: file.mimetype,
        });

        const res = await axios.post<{ fileUploadId: string }>(
          config.MEGALINTER_UPLOAD_URL,
          form
        );

        return [
          { fileUploadId: res.data.fileUploadId },
          {
            resourceType: AnalysisType.File,
            resourceValue: file.originalname,
            language,
            code,
          },
        ];
      } catch (err) {
        logger.actions.error("Unable to upload file");
        throw err;
      }
    }
  }
};
