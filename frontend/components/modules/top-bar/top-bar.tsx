"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useSideMenuStore } from "@/lib/zustand";

import { Bell, SidebarClose, SidebarOpen } from "lucide-react";

import { TopBarProfileDropdown } from "./top-bar-profile-dropdown";

type TopbarProps = {};

const TopBar = ({}: TopbarProps) => {
  const { isSideMenuOpen, setSideMenu } = useSideMenuStore((state) => state);

  return (
    <section className="relative flex h-[4.5rem] max-h-[4.5rem] w-full items-center justify-between border-b border-solid">
      {/*//* Side bar toggle button */}
      <Button
        variant={"ghost"}
        className="border border-solid p-3"
        onClick={() => setSideMenu(!isSideMenuOpen)}
      >
        {isSideMenuOpen ? (
          <SidebarClose size={18} />
        ) : (
          <SidebarOpen size={18} />
        )}
      </Button>

      {/*//* Profile picture */}
      <div className="flex items-center justify-end gap-4">
        <Button
          variant={"ghost"}
          className="border border-solid p-3"
        >
          <Bell size={18} />
        </Button>

        <Separator
          orientation="vertical"
          className="h-10"
        />
        {/*//* The profile picture side */}
        <TopBarProfileDropdown />
      </div>
    </section>
  );
};

export { TopBar };
