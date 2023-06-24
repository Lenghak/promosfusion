"use client";

import { cn } from "@/lib/utils";

import { useQRCode } from "next-qrcode";

type CouponQRProps = {
  cuid: string;
  token: string;
};

const CouponQR = ({ cuid, token }: CouponQRProps) => {
  const { SVG } = useQRCode();

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-between gap-6 rounded-xl bg-accent p-6 shadow-lg",
        "[&>div>svg]:rounded-md"
      )}
    >
      {/*//* QR Code */}
      <SVG
        text={token}
        options={{
          margin: 2,
          width: 160,
          color: {
            dark: "#000",
            light: "#fff",
          },
        }}
      />
      <div className="relative flex w-full items-center justify-evenly rounded-lg border border-dashed px-4 py-2 text-center text-xs font-medium">
        <span className="font-semibold">ID : {cuid}</span>
      </div>
    </div>
  );
};

export { CouponQR };
