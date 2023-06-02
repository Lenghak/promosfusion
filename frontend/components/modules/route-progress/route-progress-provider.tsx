"use client";

import React, { Fragment } from "react";

import ProgressBar from "next-nprogress-bar";

import { useDarkModeStore } from "@/lib/zustand";

import { useGetStore } from "@/hooks/zustand";

type RouteProgressProviderProps = {
  children: React.ReactNode;
};

const RouteProgressProvider = ({ children }: RouteProgressProviderProps) => {
  const darkMode = useGetStore(useDarkModeStore, (state) => state);

  return (
    <Fragment>
      <ProgressBar
        height="4px"
        color={darkMode?.isDarkMode ? "#2563eb" : "#3b82f6"}
        options={{ showSpinner: false }}
        appDirectory
      />
      {children}
    </Fragment>
  );
};

export { RouteProgressProvider };
