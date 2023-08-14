import { Linter } from "shared-types";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export const SelectedLinterStore = createStore<SelectedLinterStoreState>(
  () => ({
    linter: undefined,
  })
);

export const useSelectedLinterStore = () => useStore(SelectedLinterStore);

interface SelectedLinterStoreState {
  linter?: Linter;
}
