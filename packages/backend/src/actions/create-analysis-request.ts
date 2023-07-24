import axios from "axios";
import FormData from "form-data";
import md5 from "md5";
import {
  Analysis,
  AnalysisType,
  FileAnalysis,
  ProgrammingLanguage,
  RepoAnalysis,
  SnippetAnalysis,
} from "shared-types";
import config from "../config";
import { logger } from "../utils/logger";

export const createAnalysisRequestData = async (
  action: Analysis
): Promise<[unknown, string, ProgrammingLanguage?]> => {
  switch (action.inputType) {
    case AnalysisType.Repo: {
      return [
        { repositoryUrl: (<RepoAnalysis>action).url },
        (<RepoAnalysis>action).url,
      ];
    }
    case AnalysisType.Snippet: {
      const snippetMd5 = md5((<SnippetAnalysis>action).snippet);
      const snippetAction = action as SnippetAnalysis;
      const languageId = snippetAction.language?.id;
      const snippetExtension = languageId ? `.${languageId}` : undefined;
      return [
        {
          snippet: snippetAction.snippet,
          snippetExtension,
        },
        snippetMd5,
        snippetAction.language,
      ];
    }
    case AnalysisType.File: {
      const fileAction = action as FileAnalysis;
      const file = fileAction.file as Express.Multer.File;

      try {
        const form = new FormData();
        form.append("file", file.buffer, {
          filename: file.originalname,
          contentType: file.mimetype,
        });

        const res = await axios.post<{ fileUploadId: string }>(
          config.MEGALINTER_UPLOAD_URL,
          form
        );

        return [{ fileUploadId: res.data.fileUploadId }, file.originalname];
      } catch (err) {
        logger.actions.error("Unable to upload file");
        throw err;
      }
    }
  }
};
