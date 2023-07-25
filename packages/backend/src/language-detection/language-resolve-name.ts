import languagesMap from "./languages-id-to-name-map.json";

export const resolveName = (languageId: string): string | undefined => {
  if (languagesMap[languageId]) {
    return languagesMap[languageId];
  }

  return undefined;
};
