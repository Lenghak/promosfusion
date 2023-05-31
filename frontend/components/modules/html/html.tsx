"use client";

import { HtmlHTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { useDarkModeStore } from "@/lib/zustand";

import { useGetStore } from "@/hooks/zustand";

const Html = ({
  children,
  className,
  ...props
}: HtmlHTMLAttributes<HTMLHtmlElement>) => {
  const darkMode = useGetStore(useDarkModeStore, (state) => state);

  return (
    <html
      {...props}
      className={cn([className], darkMode?.isDarkMode ? "dark" : "light")}
    >
      {children}
    </html>
  );
};

export { Html };
