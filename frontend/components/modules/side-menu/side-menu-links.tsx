import { type AnchorHTMLAttributes } from "react";

import Link, { type LinkProps } from "next/link";

import { cn } from "@/lib/utils";

type SideMenuLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const SideMenuLink = ({
  href,
  children,
  className,
  ...props
}: SideMenuLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "whitespace-nowrap text-sm capitalize text-opacity-50 hover:underline hover:underline-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export { SideMenuLink };
