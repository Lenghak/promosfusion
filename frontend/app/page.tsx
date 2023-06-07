import { SideMenu } from "@/components/modules/side-menu";
import { TopBar } from "@/components/modules/top-bar";

export default function Home() {
  return (
    <main className="flex items-start">
      <SideMenu />
      <section className="flex h-full w-full flex-col px-4">
        <TopBar />
      </section>
    </main>
  );
}
