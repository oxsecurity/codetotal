import { ProgrammingLanguage } from "@ct/shared-types";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export const LanguagesStore = createStore<LanguagesStoreState>(() => ({
  languages: [],
  error: false,
  loading: false,
}));

export const useLanguagesStore = () => useStore(LanguagesStore);

interface LanguagesStoreState {
  languages: ProgrammingLanguage[];
  error: boolean;
  loading: boolean;
}
