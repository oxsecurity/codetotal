import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

export const SnippetDialogStore = createStore<SnippetDialogStoreState>(
  (set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  })
);

export const useSnippetDialogStore = () => useStore(SnippetDialogStore);

interface SnippetDialogStoreState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}
