import z from "zod";
import { create } from "zustand";

const SideMenuStates = z.object({
  isSideMenuOpen: z.boolean(),
  setSideMenu: z.function().args(z.boolean()).returns(z.void()),
});

/**
 * @description the side-menu state
 * @returns useSideMenuStore
 */
const useSideMenuStore = create<z.infer<typeof SideMenuStates>>((set) => ({
  isSideMenuOpen: true,
  setSideMenu: (state: boolean) =>
    set((prev) => ({
      ...prev,
      isSideMenuOpen: state,
    })),
}));

export { useSideMenuStore };
