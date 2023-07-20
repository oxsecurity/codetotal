import { Theme } from "@mui/material";
import { createStore, useStore } from "zustand";
import { initialMode, listenToColorSchemeChange } from "../utils/theme-utilts";

export const AppStore = createStore<AppStoreState>(() => ({
  themeMode: initialMode(),
}));

export const useAppStore = () => useStore(AppStore);

interface AppStoreState {
  themeMode: Theme["palette"]["mode"];
}

listenToColorSchemeChange();
