import axios from "axios";
import debounce from "lodash-es/debounce";
import { ProgrammingLanguage } from "shared-types";
import { AnalysisStore } from "../../analysis/stores/analysis-store";
import { backendUrl } from "./backend-url";

export const detect = async (snippet: string) => {
  const res = await axios.post<ProgrammingLanguage | undefined>(
    `${backendUrl}/detect`,
    { snippet }
  );
  AnalysisStore.setState({ language: res.data });
};

export const fetchDetect = debounce(detect, 1000);
