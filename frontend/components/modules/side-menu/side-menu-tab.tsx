import { buttonVariants } from "@/components/ui/button";
import { NavLink, NavLinkProps } from "@/components/ui/nav-link";

import { cn } from "@/lib/utils";
import { useSideMenuStore } from "@/lib/zustand";

import { LucideIcon } from "lucide-react";

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
        }),
        `w-full justify-center gap-4 ${
          isSideMenuOpen
            ? "max-md:place-self-center max-md:self-center max-md:px-3 md:justify-start"
            : "w-fit justify-center place-self-center self-center px-3"
        }`,
      ])}
      {...props}
      // style={{ justifyContent: isSideMenuOpen ? "start" : "center" }}
    >
      <Icon
        size={18}
        className="min-h-[1.25rems] min-w-[1.25rem]"
      />
      <span
        className={`whitespace-nowrap ${
          isSideMenuOpen ? "max-md:hidden" : "hidden"
        }`}
      >
        {name}
      </span>
    </NavLink>
  );
};

export { MenuTab };
