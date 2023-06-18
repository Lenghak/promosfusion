"use client";

import Image from "next/image";
import { ImageProps } from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import { useIsMounted } from "@/hooks/use-is-mounted";
import { useTheme } from "@wits/next-themes";

type LogoProps = {
  preferrence?: string;
} & Omit<ImageProps, "src" | "alt">;

const Logo = ({ preferrence, ...props }: LogoProps) => {
  const { resolvedTheme } = useTheme();
  const isMounted = useIsMounted();

  return isMounted ? (
    <Image
      width={128}
      height={128}
      src={
        (preferrence ?? resolvedTheme) === "dark"
          ? "/svg/logo-dark.svg"
          : "/svg/logo-light.svg"
      }
      {...props}
      alt="Coupon Flare Logo"
      priority
    />
  ) : (
    <Skeleton
      {...props}
      className={cn("h-32 w-32 rounded-full", props.className)}
    />
  );
};

export { Logo };
