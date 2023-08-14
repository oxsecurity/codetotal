export const initialDialogState = (set: Setter) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
});

export interface DialogStoreState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

type Setter = (state: Partial<DialogStoreState>) => void;
