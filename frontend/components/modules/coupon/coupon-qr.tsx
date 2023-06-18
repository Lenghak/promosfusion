"use client";

import { useQRCode } from "next-qrcode";

type CouponQRProps = {
  code: string;
};

const CouponQR = ({ code }: CouponQRProps) => {
  const { SVG } = useQRCode();

  return (
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
  );
};

export { CouponQR };
