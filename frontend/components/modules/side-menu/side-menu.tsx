"use client";

import Link from "next/link";

import { Logo } from "@/components/modules/logo";

import { useSideMenuStore } from "@/lib/zustand";

import {
  Bell,
  Briefcase,
  LayoutGrid,
  LifeBuoy,
  MessageCircle,
  Settings,
  Store,
  Ticket,
  User,
} from "lucide-react";
import { useLockedBody } from "usehooks-ts";

import { MenuTab } from "./side-menu-tab";
import { MenuTitle } from "./side-menu-title";

const SideMenu = () => {
  const { isSideMenuOpen } = useSideMenuStore((state) => state);

  useLockedBody(true);

  return (
    <aside
      className={
        ` min-h-screen h-full border-r border-solid px-4 relative font-bold transition-all overflow-y-scroll max-h-screen` +
        ` ${
          isSideMenuOpen
            ? "translate-x-0 md:min-w-[17rem] min-w-[6rem]"
            : "min-w-0 w-0 translate-x-0 md:min-w-[6rem] max-md:translate-x-[-10rem]"
        }`
      }
    >
      <section className="flex p-4 items-center justify-center min-h-20 max-h-20 h-full border-b border-solid">
        <Link
          href={"/"}
          className="flex justify-center w-full h-full items-center"
        >
          <Logo className="w-12 h-12" />
        </Link>
      </section>

      <section className="flex flex-col py-3 gap-1 max-md:items-center border-b border-solid">
        <MenuTitle title={"Menu"} />

        <MenuTab
          href={"/dashboard"}
          Icon={LayoutGrid}
          name="Dashboard"
        />

        <MenuTab
          href={"/campaign"}
          Icon={Ticket}
          name="Campaign"
        />
      </section>

      <section className="flex flex-col py-3 gap-1 max-md:items-center border-b border-solid">
        <MenuTitle title={"Contact"} />

        <MenuTab
          href={"/notification"}
          Icon={Bell}
          name="Notifications"
        />

        <MenuTab
          href={"/chat"}
          Icon={MessageCircle}
          name="Messages"
        />
      </section>

      <section className="flex flex-col py-3 gap-1 max-md:items-center border-b border-solid">
        <MenuTitle title={"Profile"} />

        <MenuTab
          href={"/profile"}
          Icon={User}
          name="Profile"
        />

        <MenuTab
          href={"/teams"}
          Icon={Briefcase}
          name="Team Members"
        />

        <MenuTab
          href={"/shop"}
          Icon={Store}
          name="My shop"
        />
      </section>

      <section className="flex flex-col py-3 gap-1 max-md:items-center border-b border-solid">
        <MenuTitle title={"Supports"} />

        <MenuTab
          href={"/settings"}
          Icon={Settings}
          name="Settings"
        />

        <MenuTab
          href={"/helps"}
          Icon={LifeBuoy}
          name="Helps & Supports"
        />
      </section>
    </aside>
  );
};

export { SideMenu };
