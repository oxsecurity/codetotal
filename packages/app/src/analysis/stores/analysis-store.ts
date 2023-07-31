import { AnalysisType, OneOfValues, ProgrammingLanguage } from "shared-types";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

const initialState: AnalysisStoreState = {
  repositoryURL: "",
  snippet: "",
  file: undefined,
  sending: "idle",
  inputType: AnalysisType.Snippet,
  language: undefined,
};

export const AnalysisStore = createStore<
  AnalysisStoreState & AnalysisStoreFunctions
>((set, get) => ({
  ...initialState,
  repoEnabled: () => !!get().repositoryURL && get().repositoryURL.length > 0,
  snippetEnabled: () => !!get().snippet && get().snippet.length > 0,
  reset: () => set({ ...initialState }),
}));

interface AnalysisStoreState {
  repositoryURL: string;
  snippet: string;
  file?: File;
  sending: OneOfValues<typeof AsyncState>;
  inputType: OneOfValues<typeof AnalysisType>;
  language?: ProgrammingLanguage;
}

interface AnalysisStoreFunctions {
  repoEnabled(): boolean;
  snippetEnabled(): boolean;
  reset(): void;
}

export const AsyncState = {
  Idle: "idle",
  Error: "error",
  Success: "success",
  Loading: "loading",
} as const;

export const useAnalysisStore = () => useStore(AnalysisStore);
