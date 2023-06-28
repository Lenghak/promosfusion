import { create, StoreApi, UseBoundStore } from "zustand";

type UseDialogStoreStates = {
  dialogOpen: boolean;
  alertOpen: boolean;

  openDialog: (state: boolean) => void;
  openAlert: (state: boolean) => void;
};

/**
 * @description This global store is for general usage of dialog with confirm alert
 * @return useDialogStore
 */
const useDialogStore: UseBoundStore<StoreApi<UseDialogStoreStates>> =
  create<UseDialogStoreStates>((set) => ({
    dialogOpen: false,
    alertOpen: false,

    openDialog: (state: boolean) =>
      set((prev) => ({
        ...prev,
        dialogOpen: state,
      })),

    openAlert: (state: boolean) =>
      set((prev) => ({
        ...prev,
        alertOpen: state,
      })),
  }));

export { useDialogStore };
