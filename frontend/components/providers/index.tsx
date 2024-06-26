"use client";

import { Suspense } from "react";

import { Toaster } from "@/components/ui/toast";

import { SessionProvider } from "next-auth/react";

import { ReactQueryProvider } from "./react-query";
import { RouteProgressProvider } from "./route-progress";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ReactQueryProvider>
      <Suspense>
        <RouteProgressProvider>
          <SessionProvider>
            {children} <Toaster />
          </SessionProvider>
        </RouteProgressProvider>
      </Suspense>
    </ReactQueryProvider>
  );
}
