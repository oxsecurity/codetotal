import { ModelOperations } from "@vscode/vscode-languagedetection";
import iconsMap from "devicon/devicon.json";
import languagesMap from "./languages-map.json";

// Language detection using @vscode/vscode-languagedetection (guesslang)
// Name resolution using highlight.js (https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md)
// Icon resolution using "devicon" (https://devicon.dev/)

const modulOperations = new ModelOperations();

export const detect = async (snippet: string) => {
  const detection = await modulOperations.runModel(snippet);

  if (detection.length > 0) {
    return detection[0].languageId;
  }

  return undefined;
};

export const resolveName = (languageId: string) => {
  if (languagesMap[languageId]) {
    return languagesMap[languageId];
  }

  return undefined;
};

export const resolveIcon = (languageName: string) => {
  const lcName = languageName.toLowerCase();
  const devIconInfo = iconsMap.find((l) => l.name === lcName);
  if (!devIconInfo) {
    return undefined;
  }

  // const wordmarkIcon = devIconInfo.versions.svg.some((iconName) =>
  //   iconName.includes("original-wordmark")
  // );

  return devIconInfo.versions.svg[0];
};
