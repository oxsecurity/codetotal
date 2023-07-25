import { ProgrammingLanguage } from "shared-types";
import { resolveIcon } from "./language-resolve-icon";
import { resolveName } from "./language-resolve-name";
import { resolveId } from "./language-resolve-id";

export const detectLanguage = async (
  snippet: string
): Promise<ProgrammingLanguage | undefined> => {
  const languageId = await resolveId(snippet);

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
