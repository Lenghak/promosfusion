import { QRScannerTrigger } from "@/components/modules/qr-scanner";
import { SideMenu } from "@/components/modules/side-menu";
import { TopBar } from "@/components/modules/top-bar";

import { QrCode } from "lucide-react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="flex items-start">
      <SideMenu />

      <section className="flex h-full w-full flex-col px-4">
        <TopBar />

        <div className="h-full w-full">{children}</div>
      </section>

      <QRScannerTrigger />
    </main>
  );
}
