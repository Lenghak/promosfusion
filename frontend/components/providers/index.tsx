"use client";

import { SessionProvider } from "next-auth/react";

import { ReactQueryProvider } from "./react-query";
import { RouteProgressProvider } from "./route-progress";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <RouteProgressProvider>{children}</RouteProgressProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
