import { create, StoreApi, UseBoundStore } from "zustand";

type UseDialogStoreStates = {
  dialogOpen: boolean;
  alertOpen: boolean;

  setDialog: (state: boolean) => void;
  openConfirm: (state: boolean) => void;
};

/**
 * @description This global store is for general usage of dialog with confirm alert
 * @return useDialogStore
 */
const useDialogStore: UseBoundStore<StoreApi<UseDialogStoreStates>> =
  create<UseDialogStoreStates>((set) => ({
    dialogOpen: false,
    alertOpen: false,

    setDialog: (state: boolean) =>
      set((prev) => ({
        ...prev,
        dialogOpen: state,
        alertOpen: false,
      })),

    openConfirm: () =>
      set((prev) => ({
        ...prev,
        dialogOpen: false,
        alertOpen: true,
      })),
  }));

export { useDialogStore };
