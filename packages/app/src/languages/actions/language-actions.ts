import { ProgrammingLanguage } from "@ct/shared-types";
import axios from "axios";
import { ApiUrl } from "../../common/utils/backend-url";
import { LanguagesStore } from "../stores/languages-store";

export const loadAllLanguages = async () => {
  try {
    if (LanguagesStore.getState().languages.length > 0) {
      return;
    }

    LanguagesStore.setState({ loading: true, error: false });
    const res = await axios.get<ProgrammingLanguage[]>(
      `${ApiUrl}/all-languages`
    );

    LanguagesStore.setState({ languages: res.data });
  } catch (err) {
    console.error("Unable to fetch all languages", err);
    LanguagesStore.setState({ error: true });
  } finally {
    LanguagesStore.setState({ loading: false });
  }
};
