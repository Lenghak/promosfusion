"use client";

import Link from "next/link";

import { Logo } from "@/components/modules/logo";
import { Small } from "@/components/ui/small";

import { useSideMenuStore } from "@/lib/zustand";

import {
  Activity,
  Bell,
  Briefcase,
  Flag,
  HelpCircle,
  LayoutGrid,
  MessageCircle,
  Settings,
  Store,
  Ticket,
  User,
} from "lucide-react";
import { useLockedBody } from "usehooks-ts";

import { SideMenuLink } from "./side-menu-links";
import { MenuTab } from "./side-menu-tab";
import { MenuTitle } from "./side-menu-title";

const otherLinks = [
  "about",
  "contact-us",
  "terms",
  "privacy",
  "security",
  "docs",
];

const SideMenu = () => {
  const { isSideMenuOpen } = useSideMenuStore((state) => state);

  useLockedBody(true);

  return (
    <aside
      className={`relative h-full max-h-screen min-h-screen overflow-y-scroll border-r border-solid px-4 font-bold transition-all
       ${
         isSideMenuOpen
           ? "min-w-[6rem] max-w-[6rem] translate-x-0 md:min-w-[17rem] md:max-w-[17rem]"
           : "w-0 min-w-0 max-w-[6rem] translate-x-0 max-md:translate-x-[-10rem] md:min-w-[6rem]"
       }`}
    >
      <section className="min-h-20 flex h-full max-h-20 items-center justify-center border-b border-solid p-4">
        <Link
          href={"/"}
          className="flex h-full w-fit items-center justify-center "
        >
          <Logo className="h-12 w-12" />
        </Link>
      </section>

      <section className="flex flex-col gap-1 border-b border-solid py-3 max-md:items-center">
        <MenuTitle title={"Menu"} />

        <MenuTab
          href={"/"}
          Icon={LayoutGrid}
          name="Dashboard"
        />

        <MenuTab
          href={"/campaigns"}
          Icon={Ticket}
          name="Campaigns"
        />

        <MenuTab
          href={"/reports"}
          Icon={Flag}
          name="Reports"
        />

        <MenuTab
          href={"/activities"}
          Icon={Activity}
          name="Actvities"
        />
      </section>

      <section className="flex flex-col gap-1 border-b border-solid py-3 max-md:items-center">
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

      <section className="flex flex-col gap-1 border-b border-solid py-3 max-md:items-center">
        <MenuTitle title={"Info"} />

        <MenuTab
          href={"/profile"}
          Icon={User}
          name="My Profile"
        />

        <MenuTab
          href={"/teams"}
          Icon={Briefcase}
          name="My Team"
        />

        <MenuTab
          href={"/shop"}
          Icon={Store}
          name="My Shop"
        />
      </section>

      <section className="flex flex-col gap-1 border-b border-solid py-3 max-md:items-center">
        <MenuTitle title={"Supports"} />

        <MenuTab
          href={"/settings"}
          Icon={Settings}
          name="Settings"
        />

        <MenuTab
          href={"/help"}
          Icon={HelpCircle}
          name="Helps"
        />
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 px-4 py-6 max-md:hidden">
        {otherLinks.map((link) => (
          <SideMenuLink href={"/" + link}>{link}</SideMenuLink>
        ))}
      </section>

      <section className="flex flex-col items-center justify-center gap-1 py-3 max-md:hidden">
        <Small className="text-sm">© 2023 Coupon Flare</Small>
      </section>
    </aside>
  );
};

export { SideMenu };
