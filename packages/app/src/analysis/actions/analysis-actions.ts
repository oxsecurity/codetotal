import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import {
  Analysis,
  AnalysisType,
  FileAnalysis,
  RepoAnalysis,
  SnippetAnalysis,
} from "shared-types";
import config from "../../config.json";
import { ReportStore } from "../../report/stores/fe-report-store";
import { AnalysisStore, AsyncState } from "../stores/analysis-store";

export const startAnalysis = async (navigate: NavigateFunction) => {
  AnalysisStore.setState({
    sending: AsyncState.Loading,
  });

  try {
    // Reset progress store and unsubscribe from future messages
    const { reset, unsubscribe } = ReportStore.getState();
    unsubscribe && unsubscribe();
    reset();

    const data = createRequestData();
    const report = await axios.post(`${config.backendUrl}/analysis`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const requestId = report.data.requestId;
    navigate({ pathname: `/report/${requestId}` });
  } catch (err) {
    console.error(err);
    AnalysisStore.setState({
      sending: AsyncState.Error,
    });
  }
};

const createRequestData = (): Analysis | undefined => {
  const { inputType, repositoryURL, file, snippet } = AnalysisStore.getState();
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
      return { ...sharedVariables, snippet } as SnippetAnalysis;
  }
};