import { ProgrammingLanguage } from "shared-types";
import { detect, resolveIcon } from "./language-detection";
import { resolveName } from "./language-resolve-name";

export const detectLanguage = async (
  snippet: string
): Promise<ProgrammingLanguage | undefined> => {
  const languageId = await detect(snippet);

  if (languageId) {
    const name = resolveName(languageId);
    const icon = resolveIcon(name);
    return {
      id: languageId,
      name,
      icon,
    };
  }

  return undefined;
};
