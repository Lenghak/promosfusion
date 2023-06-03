"use client";

import Link, { LinkProps } from "next/link";

import { Logo } from "@/components/modules/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";

import { useSideMenuStore } from "@/lib/zustand";

import {
  Bell,
  LayoutGrid,
  LifeBuoy,
  MessageCircle,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";

type navigationType = {
  campaign: string;
  team: string;
  notification: string;
  message: string;
  settings: string;
  helps: string;
};

const navigation: navigationType = {
  campaign: "Campaign",
  team: "Team Members",
  notification: "Notification",
  message: "Message",
  settings: "Settings",
  helps: "Helps & Supports",
};

const icon: React.ReactNode[] = [
  <LayoutGrid size={20} />,
  <Users size={20} />,
  <Bell size={20} />,
  <MessageCircle size={20} />,
  <Settings size={20} />,
  <LifeBuoy size={20} />,
];

const SideMenu = () => {
  const { isSideMenuOpen } = useSideMenuStore((state) => state);

  return (
    <aside
      className={
        ` max-h-full min-h-screen h-full border-r border-solid px-4` +
        `   0 relative font-bold transition-all ${
          isSideMenuOpen
            ? "translate-x-0 md:min-w-[17rem] min-w-[6rem]"
            : "min-w-0 w-0 translate-x-0 md:min-w-[6rem] max-md:translate-x-[-10rem]"
        }`
      }
    >
      <section className="flex p-4 items-center justify-center min-h-20 max-h-20 h-full border-b border-solid">
        <Link
          href={"/campaign"}
          className="flex justify-center w-full h-full items-center"
        >
          <Logo className="w-12 h-12" />
        </Link>
      </section>

      <section className="flex flex-col min-h-[2.75rem] max-w-full">
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger></AccordionTrigger>
            <AccordionContent asChild>
              <MenuTab
                href={""}
                name={"My Shop"}
                icon={<ShoppingBag size={20} />}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="flex flex-col">
        {Object.keys(navigation).map((key: string, index: number) => (
          <MenuTab
            key={index}
            href={key}
            name={navigation[key as keyof navigationType]}
            icon={icon[index]}
          />
        ))}
      </section>
    </aside>
  );
};

/**
 * @description the menu tab component for menu
 */
const MenuTab = ({
  href,
  name,
  icon,
  ...props
}: {
  name: string;
  icon: React.ReactNode;
} & LinkProps) => {
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: "ghost",
        size: "lg",
        className: "gap-4 my-2",
      })}
      {...props}
      style={{ justifyContent: "start" }}
    >
      {icon}
      <span>{name}</span>
    </Link>
  );
};

export { SideMenu };
