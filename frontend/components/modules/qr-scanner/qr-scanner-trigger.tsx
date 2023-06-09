"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { QrCode } from "lucide-react";

type QRScannerTriggerProps = {};

const QRScannerTrigger = ({}: QRScannerTriggerProps) => {
  return (
    <Link
      href={"/coupon/scan"}
      className={cn(
        buttonVariants({
          variant: "default",
          className: "fixed bottom-4 right-4 h-fit rounded-full p-4",
        })
      )}
    >
      <QrCode />
    </Link>
  );
};

export { QRScannerTrigger };
