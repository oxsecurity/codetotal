import { ModelOperations } from "@vscode/vscode-languagedetection";
import iconsMap from "devicon/devicon.json";

// Language detection of code snippet using @vscode/vscode-languagedetection (guesslang)
// Name resolution using highlight.js (https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md)
// Icon resolution using "devicon" (https://devicon.dev/)

const modulOperations = new ModelOperations();

export const detect = async (snippet: string): Promise<string | undefined> => {
  const detection = await modulOperations.runModel(snippet);

  if (detection.length > 0) {
    return detection[0].languageId;
  }

  return undefined;
};

export const resolveIcon = (languageName: string): string | undefined => {
  const lcName = languageName.toLowerCase();
  const devIconInfo = iconsMap.find((l) => l.name === lcName);

  if (devIconInfo) {
    return devIconInfo.versions.svg[0];
  }

  return undefined;
};
