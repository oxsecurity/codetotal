import { ProgrammingLanguage } from "@ct/shared-types";
import { fetchDetect } from "../../languages/actions/detect-language-actions";
import { AnalysisStore } from "../stores/analysis-store";

export const detectSnippetLanguage = async (snippet: string) => {
  const { userSelectedLanguage } = AnalysisStore.getState();
  try {
    const detectedLanguage = await fetchDetect(snippet, userSelectedLanguage);
    AnalysisStore.setState({ detectedLanguage });
  } catch (err) {
    console.error("Unable to detect snippet language", err);
  }
};

export const clearLanguages = () => {
  AnalysisStore.setState({
    userSelectedLanguage: undefined,
    detectedLanguage: undefined,
  });
};

export const setUserSelectedLanguage = (
  newValue: ProgrammingLanguage | undefined
) => {
  AnalysisStore.setState({ userSelectedLanguage: newValue });
};
