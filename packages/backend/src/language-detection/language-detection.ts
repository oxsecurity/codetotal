import { ModelOperations } from "@vscode/vscode-languagedetection";

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
