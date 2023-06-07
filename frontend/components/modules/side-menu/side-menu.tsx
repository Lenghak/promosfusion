"use client";

import Link from "next/link";

import { Logo } from "@/components/modules/logo";
import { Button } from "@/components/ui/button";
import { Small } from "@/components/ui/small";

import { cn } from "@/lib/utils";
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
      className={`relative h-full max-h-screen min-h-screen overflow-x-hidden border-r border-solid px-4 font-bold transition-all
       ${
         isSideMenuOpen
           ? "md:overflow-y -scroll min-w-[6rem] max-w-[6rem] translate-x-0 md:min-w-[17rem] md:max-w-[17rem]"
           : "w-0 min-w-0 max-w-[6rem] translate-x-0 overflow-x-hidden max-md:translate-x-[-10rem] max-md:p-0 md:min-w-[6rem]"
       }`}
    >
      <section className="flex h-[4.5rem] max-h-[4.5rem] items-center justify-center border-b border-solid py-4">
        <Link
          href={"/"}
          className="flex h-full w-fit items-center justify-center gap-4"
        >
          <Logo className="h-10 w-10" />
          <span
            className={cn(
              "hidden whitespace-nowrap text-sm md:inline",
              isSideMenuOpen ? "" : "md:hidden"
            )}
          >
            Coupon Flare
          </span>
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

      <section
        className={
          "flex flex-col gap-1 border-b border-solid py-3 max-md:items-center"
        }
      >
        <MenuTitle title={"Configs"} />

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

      <section
        className={cn(
          "flex flex-wrap items-center justify-between gap-4 px-4 py-6 max-md:hidden",
          isSideMenuOpen ? "max-md:hidden" : "hidden"
        )}
      >
        {otherLinks.map((link) => (
          <SideMenuLink
            key={link}
            href={"/" + link}
          >
            {link}
          </SideMenuLink>
        ))}
      </section>

      <section
        className={cn(
          "flex flex-col items-center justify-center gap-1 py-3 max-md:hidden",
          isSideMenuOpen ? "max-md:hidden" : "hidden"
        )}
      >
        <Small className="text-sm">© 2023 Coupon Flare</Small>
      </section>
    </aside>
  );
};

export { SideMenu };
