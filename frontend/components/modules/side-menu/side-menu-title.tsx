import { Label } from "@/components/ui/label";

import { useSideMenuStore } from "@/lib/zustand";

const MenuTitle = ({ title }: { title: React.ReactNode }) => {
  const { isSideMenuOpen } = useSideMenuStore((state) => state);

  return (
    <Label
      className={`px-4 py-3 ${isSideMenuOpen ? "max-md:hidden" : "hidden"}`}
    >
      {title}
    </Label>
  );
};

export { MenuTitle };
