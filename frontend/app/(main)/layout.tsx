"use client";

import { SideMenu } from "@/components/modules/side-menu";
import { TopBar } from "@/components/modules/top-bar";

import { useLockedBody } from "usehooks-ts";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  useLockedBody(true);

  return (
    <main className="flex items-start overflow-hidden">
      <SideMenu />

      <section className="flex h-full min-h-screen w-full flex-col overflow-hidden overflow-y-auto px-4">
        <TopBar />

        <div className="h-full w-full overflow-auto">{children}</div>
      </section>
    </main>
  );
}
