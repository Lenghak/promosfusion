"use client";

import { SessionProvider } from "next-auth/react";

import { ReactQueryProvider } from "./react-query";
import { RouteProgressProvider } from "./route-progress";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ReactQueryProvider>
      <RouteProgressProvider>
        <SessionProvider>{children}</SessionProvider>
      </RouteProgressProvider>
    </ReactQueryProvider>
  );
}