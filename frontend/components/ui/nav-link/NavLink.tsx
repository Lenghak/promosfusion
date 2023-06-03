"use client";

import { AnchorHTMLAttributes, ForwardedRef, forwardRef } from "react";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export type NavLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    exact?: boolean;
    children?: React.ReactNode;
    className?: string;
  };

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    { href, exact, children, className, ...props }: NavLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const pathname = usePathname();
    const isActive = exact ? pathname === href : pathname.startsWith(`${href}`);

    return (
      <Link
        ref={ref}
        href={href}
        className={cn([className, isActive ? "active" : ""])}
        {...props}
      >
        {children}
      </Link>
    );
  }
);
export { NavLink };
