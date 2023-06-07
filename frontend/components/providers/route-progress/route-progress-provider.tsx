"use client";

import React, { Fragment } from "react";

import ProgressBar from "next-nprogress-bar";

type RouteProgressProviderProps = {
  children: React.ReactNode;
};

const RouteProgressProvider = ({ children }: RouteProgressProviderProps) => {
  return (
    <Fragment>
      <ProgressBar
        height="4px"
        color={true ? "#2563eb" : "#3b82f6"}
        options={{ showSpinner: false }}
        appDirectory
      />
      {children}
    </Fragment>
  );
};

export { RouteProgressProvider };
