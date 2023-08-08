import axios from "axios";
import { ProgrammingLanguage } from "shared-types";
import { backendUrl } from "../../common/utils/backend-url";
import { LanguagesStore } from "../stores/languages-store";

export const loadAllLanguages = async () => {
  try {
    if (LanguagesStore.getState().languages.length > 0) {
      return;
    }

    LanguagesStore.setState({ loading: true, error: false });
    const res = await axios.get<ProgrammingLanguage[]>(
      `${backendUrl}/all-languages`
    );

    LanguagesStore.setState({ languages: res.data });
  } catch (err) {
    console.error("Unable to fetch all languages", err);
    LanguagesStore.setState({ error: true });
  } finally {
    LanguagesStore.setState({ loading: false });
  }
};
