import languagesMap from "./languages-map.json";

export const resolveName = (languageId: string): string | undefined => {
  if (languagesMap[languageId]) {
    return languagesMap[languageId];
  }

  return undefined;
};
