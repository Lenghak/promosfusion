"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useSideMenuStore } from "@/lib/zustand";

import { Bell, Search, SidebarClose, SidebarOpen } from "lucide-react";

import { QRScannerForm } from "../qr-scanner";
import { TopBarProfileDropdown } from "./top-bar-profile-dropdown";

const TopBar = () => {
  const { isSideMenuOpen, setSideMenu } = useSideMenuStore((state) => state);

  return (
    <section className="relative flex h-[4.5rem] max-h-[4.5rem] min-h-[4.5rem] w-full items-center justify-between border-b border-solid">
      {/*//* Side bar toggle button */}
      <Button
        variant={"ghost"}
        className="p-3"
        onClick={() => setSideMenu(!isSideMenuOpen)}
      >
        {isSideMenuOpen ? (
          <SidebarClose size={18} />
        ) : (
          <SidebarOpen size={18} />
        )}
      </Button>

      {/*//* Profile picture */}
      <div className="flex items-center justify-end gap-3">
        <QRScannerForm />

     
        <Button
          variant={"ghost"}
          className="p-3"
        >
          <Search size={18} />
        </Button>

        <Button
          variant={"ghost"}
          className="p-3"
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
