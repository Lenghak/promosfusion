import "@/scss/globals.scss";

import { Fira_Mono } from "next/font/google";

import { Icon } from "@/components/modules/icon";
import Providers from "@/components/providers";

import { ServerThemeProvider } from "@wits/next-themes";

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
    <ServerThemeProvider
      attribute="class"
      enableSystem
    >
      <html
        lang="en"
        suppressHydrationWarning
      >
        <head>
          <Icon />
        </head>
        <body className={firaMono.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
