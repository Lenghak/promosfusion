import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type darkModeState = {
  isDarkMode: boolean;
  setDarkMode: (state: boolean) => void;
};

/**
 * @description the darkModehook persisted in the localstorage containing theme value for dark | light mode
 * @returns darkModeState
 */
const useDarkModeStore = create<
  darkModeState,
  [["zustand/persist", darkModeState]]
>(
  persist<darkModeState>(
    (set) => ({
      isDarkMode: false,
      setDarkMode: (state: boolean) =>
        set((prev) => ({
          ...prev,
          isDarkmode: state,
        })),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useDarkModeStore };
