import "@/scss/globals.scss";

import { Fira_Mono } from "next/font/google";

import { Html } from "@/components/modules/html";
import { Icon } from "@/components/modules/icon";
import { RouteProgressProvider } from "@/components/modules/route-progress";

const firaMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  fallback: [
    "Courier New",
    "Courier",
    "Lucida Sans Typewriter",
    "Lucida Typewriter",
    "monospace",
  ],
});

export const metadata = {
  title: "Coupon Flare",
  description:
    "CouponFlare is a versatile coupon generating tool that enables users to easily create and distribute customized coupons for a wide range of products and services. CouponGen's user-friendly design and strong features make it simple for businesses and individuals to attract customers, increase sales, and strengthen brand loyalty.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Html lang="en">
      <head>
        <Icon />
      </head>
      <body className={firaMono.className}>
        <RouteProgressProvider>{children}</RouteProgressProvider>
      </body>
    </Html>
  );
}
