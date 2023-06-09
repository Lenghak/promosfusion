"use client";

import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { QrCode } from "lucide-react";

type QRScannerTriggerProps = {};

const QRScannerTrigger = ({}: QRScannerTriggerProps) => {
  return (
    <Button
      className={cn(
        buttonVariants({
          variant: "default",
          className: "fixed bottom-4 right-4 h-fit rounded-full p-4",
        })
      )}
    >
      <QrCode />
    </Button>
  );
};

export { QRScannerTrigger };
