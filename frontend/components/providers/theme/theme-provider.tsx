"use client";

import { ThemeProvider } from "next-themes";

type DerivedThemeProviderProps = {
  children: React.ReactNode;
};

const DerivedThemeProvider = ({ children }: DerivedThemeProviderProps) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export { DerivedThemeProvider as ThemeProvider };
