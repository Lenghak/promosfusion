"use client";

import React, { Fragment } from "react";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

type RouteProgressProviderProps = {
  children: React.ReactNode;
};

const RouteProgressProvider = ({ children }: RouteProgressProviderProps) => {
  return (
    <Fragment>
      <ProgressBar
        height="4px"
        color={"#2563eb"}
        options={{ showSpinner: false }}
      />
      {children}
    </Fragment>
  );
};

export { RouteProgressProvider };
