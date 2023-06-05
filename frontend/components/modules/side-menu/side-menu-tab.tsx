import { cn } from "@/lib/utils";

import { NavLinkProps, NavLink } from "@/components/ui/nav-link";
import { LucideIcon } from "lucide-react";
import { useSideMenuStore } from "@/lib/zustand";
import { buttonVariants } from "@/components/ui/button";
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
  
  export { MenuTab };