"use client";

import { Button } from "@/components/ui/button";

import { useSideMenuStore } from "@/lib/zustand";

import { SidebarClose, SidebarOpen } from "lucide-react";

type TopbarProps = {};

const TopBar = ({}: TopbarProps) => {
  const { isSideMenuOpen, setSideMenu } = useSideMenuStore((state) => state);

  return (
    <section className="relative flex h-[4.5rem] max-h-[4.5rem] w-full items-center border-b border-solid">
      {/*//* Toggle Button */}
      <Button
        variant={"ghost"}
        className="border border-solid"
        onClick={() => setSideMenu(!isSideMenuOpen)}
      >
        {isSideMenuOpen ? (
          <SidebarClose size={20} />
        ) : (
          <SidebarOpen size={20} />
        )}
      </Button>
    </section>
  );
};

export { TopBar };
