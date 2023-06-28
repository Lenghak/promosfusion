import { create } from "zustand";

type SideMenuState = {
  isSideMenuOpen: boolean;
  setSideMenu: (state: boolean) => void;
};

/**
 * @description the side-menu state
 * @returns useSideMenuStore
 */
const useSideMenuStore = create<SideMenuState>((set) => ({
  isSideMenuOpen: true,
  setSideMenu: (state: boolean) =>
    set((prev) => ({
      ...prev,
      isSideMenuOpen: state,
    })),
}));

export { useSideMenuStore };
