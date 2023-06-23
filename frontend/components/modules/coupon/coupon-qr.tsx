"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { useQRCode } from "next-qrcode";

type CouponQRProps = {
  code: string;
  action: React.ReactNode;
};

const CouponQR = ({ code, action }: CouponQRProps) => {
  const { SVG } = useQRCode();

  return (
    <div
      className={cn(
        "relative flex w-fit flex-col items-center justify-between rounded-xl bg-accent p-6 shadow-lg",
        "[&>div>svg]:rounded-md"
      )}
    >
      {/*//* QR Code */}
      <SVG
        text={code}
        options={{
          margin: 2,
          width: 160,
          color: {
            dark: "#000",
            light: "#fff",
          },
        }}
      />
      -- : --
      {action}
    </div>
  );
};

export { CouponQR };
