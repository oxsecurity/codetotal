import axios from "axios";
import {
  Analysis,
  AnalysisType,
  FileAnalysis,
  RepoAnalysis,
  SnippetAnalysis,
} from "shared-types";
import { backendUrl } from "../../common/utils/backend-url";
import { AnalysisStore, AsyncState } from "../stores/analysis-store";

export const startAnalysis = async () => {
  AnalysisStore.setState({
    sending: AsyncState.Loading,
  });

  try {
    const data = createRequestData();
    const report = await axios.post(`${backendUrl}/analysis`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
