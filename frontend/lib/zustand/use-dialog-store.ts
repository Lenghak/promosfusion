import * as z from "zod";
import { create, StoreApi, UseBoundStore } from "zustand";

const UseDialogStoreStates = z.object({
  dialogOpen: z.boolean(),
  alertOpen: z.boolean(),
  id: z.string(),

  openDialog: z
    .function()
    .args(z.boolean(), z.string().optional())
    .returns(z.void()),
  openAlert: z
    .function()
    .args(z.boolean(), z.string().optional())
    .returns(z.void()),
});

/**
 * @description This global store is for general usage of dialog with confirm alert
 * @return useDialogStore
 */
const useDialogStore: UseBoundStore<
  StoreApi<z.infer<typeof UseDialogStoreStates>>
> = create<z.infer<typeof UseDialogStoreStates>>((set) => ({
  dialogOpen: false,
  alertOpen: false,
  id: "",

  openDialog: (state: boolean, id: string = "") =>
    set((prev) => ({
      ...prev,
      dialogOpen: state,
      id: id,
    })),

  openAlert: (state: boolean, id: string = "") =>
    set((prev) => ({
      ...prev,
      alertOpen: state,
      id: id,
    })),
}));

export { useDialogStore };
