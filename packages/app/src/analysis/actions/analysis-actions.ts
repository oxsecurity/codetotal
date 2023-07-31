import axios from "axios";
import {
  Analysis,
  AnalysisType,
  FileAnalysis,
  RepoAnalysis,
  SnippetAnalysis,
} from "shared-types";
import config from "../../config";
import { ReportStore } from "../../report/stores/fe-report-store";
import { AnalysisStore, AsyncState } from "../stores/analysis-store";

export const startAnalysis = async () => {
  AnalysisStore.setState({
    sending: AsyncState.Loading,
  });

  try {
    // Reset progress store and unsubscribe from future messages
    const { reset, unsubscribe } = ReportStore.getState();
    unsubscribe && unsubscribe();
    reset();

    const data = createRequestData();
    const report = await axios.post(
      `http://${config.CODETOTAL_HTTP_HOST}:${config.CODETOTAL_HTTP_PORT}/analysis`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    AnalysisStore.getState().reset();
    return report.data.requestId;
  } catch (err) {
    console.error(err);
    AnalysisStore.setState({
      sending: AsyncState.Error,
    });
  }
};

const createRequestData = (): Analysis | undefined => {
  const { inputType, repositoryURL, file, snippet, language } =
    AnalysisStore.getState();
  const sharedVariables = {
    name: "Lint",
    inputType,
  };

  switch (inputType) {
    case AnalysisType.Repo:
      return { ...sharedVariables, url: repositoryURL } as RepoAnalysis;
    case AnalysisType.File:
      return { ...sharedVariables, file } as FileAnalysis;
    case AnalysisType.Snippet:
      return {
        ...sharedVariables,
        snippet,
        language,
      } as SnippetAnalysis;
  }
};
