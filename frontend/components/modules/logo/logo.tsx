"use client";

import Image from "next/image";

import { useDarkModeStore } from "@/lib/zustand";

import { useGetStore } from "@/hooks/zustand";

type LogoProps = {};

const Logo = ({}: LogoProps) => {
  const darkMode = useGetStore(useDarkModeStore, (state) => state);

  return (
    <Image
      alt="Coupon Flare Logo"
      width={128}
      height={128}
      src={darkMode?.isDarkMode ? "/svg/logo-dark.svg" : "/svg/logo-light.svg"}
    />
  );
};

export { Logo };
