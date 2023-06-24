"use client";

import { cn } from "@/lib/utils";

import { useQRCode } from "next-qrcode";

type CouponQRProps = {
  cuid: string;
  token: string;
  action?: React.ReactNode;
};

const CouponQR = ({ cuid, token, action }: CouponQRProps) => {
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
      <div className="relative flex w-fit items-center justify-evenly gap-4 rounded-lg border border-dashed px-4 py-2 text-center text-xs font-medium">
        {/* <span className="absolute -top-4 left-4 rounded-sm bg-accent px-3 py-2 font-semibold">
          Coupon ID
        </span> */}
        <span className="font-medium">ID : {cuid}</span>
      </div>

      {action}
    </div>
  );
};

export { CouponQR };
