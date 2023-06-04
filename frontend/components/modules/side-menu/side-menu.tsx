"use client";

import Link from "next/link";

import { Logo } from "@/components/modules/logo";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NavLink, NavLinkProps } from "@/components/ui/nav-link";

import { cn } from "@/lib/utils";
import { useSideMenuStore } from "@/lib/zustand";

import {
  Bell,
  LayoutGrid,
  LifeBuoy,
  LucideIcon,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";

const SideMenu = () => {
  const { isSideMenuOpen } = useSideMenuStore((state) => state);

  return (
    <aside
      className={
        ` max-h-full min-h-screen h-full border-r border-solid px-4 relative font-bold transition-all` +
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
          href={"/teams"}
          Icon={Users}
          name="Team Members"
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

const MenuTitle = ({ title }: { title: React.ReactNode }) => {
  const { isSideMenuOpen } = useSideMenuStore((state) => state);

  return (
    <Label
      className={`px-4 py-3 text-neutral-400 ${
        isSideMenuOpen ? "max-md:hidden" : "hidden"
      }`}
    >
      {title}
    </Label>
  );
};

/**
 * @description the menu tab component for menu
 */
const MenuTab = ({
  href,
  name,
  Icon,
  className,
  ...props
}: {
  name: string;
  Icon: LucideIcon;
} & NavLinkProps) => {
  const { isSideMenuOpen } = useSideMenuStore((state) => state);
  return (
    <NavLink
      href={href}
      className={cn([
        buttonVariants({
          variant: "ghost",
          size: "lg",
        }),
        "gap-4 w-full",
      ])}
      {...props}
      style={{ justifyContent: "start" }}
    >
      <Icon size={20} />
      <span className={`${isSideMenuOpen ? "max-md:hidden" : "hidden"}`}>
        {name}
      </span>
    </NavLink>
  );
};

export { SideMenu };
