import { SideMenu } from "@/components/modules/side-menu";
import { TopBar } from "@/components/modules/top-bar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="flex items-start">
      <SideMenu />

      <section className="flex h-full min-h-screen w-full flex-col overflow-y-auto px-4">
        <TopBar />

        <div className="h-full w-full">{children}</div>
      </section>
    </main>
  );
}
