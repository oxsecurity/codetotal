import { ProgrammingLanguage } from "@ct/shared-types";
import { resolveId } from "./language-resolve-id";
import supportedLanguages from "./supported-languages.json";

export const detectLanguage = async (
  snippet: string
): Promise<ProgrammingLanguage | undefined> => {
  const languageId = await resolveId(snippet);

  if (languageId && supportedLanguages[languageId]) {
    return { id: languageId, ...supportedLanguages[languageId] };
  }

  return undefined;
};

export const allLanguages = () => {
  return allLanguagesSorted;
};

const allLanguagesSorted = Object.keys(supportedLanguages)
  .sort()
  .map((languageId) => ({
    id: languageId,
    name: supportedLanguages[languageId].name,
    displayName: supportedLanguages[languageId].displayName,
    icon: supportedLanguages[languageId].icon,
  }));
