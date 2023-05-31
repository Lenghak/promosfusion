import "@/scss/globals.scss";

import { Fira_Mono } from "next/font/google";

import { Html } from "@/components/modules/html";
import { Icon } from "@/components/modules/icon";

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
  title: "Create Next App",
  description: "Generated by create next app",
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
      <body className={firaMono.className}>{children}</body>
    </Html>
  );
}
