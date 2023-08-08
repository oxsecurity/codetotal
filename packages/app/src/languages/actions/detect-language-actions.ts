import axios from "axios";
import debounce from "lodash-es/debounce";
import { ProgrammingLanguage } from "shared-types";
import { backendUrl } from "../../common/utils/backend-url";
import { LanguagesStore } from "../stores/languages-store";

export const detect = async (
  snippet: string,
  userSelectedLanguage: ProgrammingLanguage | undefined
) => {
  if (userSelectedLanguage) {
    LanguagesStore.setState({ loading: false });
    return;
  }

  LanguagesStore.setState({ loading: true });

  const res = await axios.post<ProgrammingLanguage | undefined>(
    `${backendUrl}/detect`,
    { snippet }
  );

  LanguagesStore.setState({ loading: false });
  return res.data;
};

export const fetchDetect = debounce(detect, 1000, { leading: true });
