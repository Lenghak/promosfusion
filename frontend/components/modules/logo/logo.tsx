"use client";

import Image from "next/image";
import { ImageProps } from "next/image";

import { useDarkModeStore } from "@/lib/zustand";

import { useGetStore } from "@/hooks/zustand";

type LogoProps = {} & Omit<ImageProps, "src" | "alt">;

const Logo = ({ ...props }: LogoProps) => {
  const darkMode = useGetStore(useDarkModeStore, (state) => state);

  return (
    <Image
      width={128}
      height={128}
      src={darkMode?.isDarkMode ? "/svg/logo-dark.svg" : "/svg/logo-light.svg"}
      {...props}
      alt="Coupon Flare Logo"
    />
  );
};

export { Logo };
