"use client";

import { ShopUpdateForm } from "@/components/modules/shop/shop-update-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useDialogStore } from "@/lib/zustand";

import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";

import { type Shop } from "@/types/shop";

type ShopInfoProps = {
  shop?: Shop;
};

const ShopInfo = ({ shop }: ShopInfoProps) => {
  const { data: session } = useSession();

  const { openDialog } = useDialogStore((state) => state);

  return (
    <div className="flex h-full w-full flex-col items-start justify-center gap-6 border-t p-4 lg:flex-row">
      <div className="flex w-full justify-between gap-2">
        <div className="flex w-full flex-col gap-1">
          <span className="text-lg font-semibold">Shop Information</span>
          <span className="text-sm text-muted-foreground">
            Here are the basic information of shop
          </span>
        </div>
        {session?.user.role === "root" && (
          <Button
            variant={"ghost"}
            className="h-fit w-fit p-3"
            onClick={() => openDialog(true, `shop-update-dialog-${shop?.id}`)}
          >
            <Edit size={18} />
          </Button>
        )}
      </div>

      <div className="flex w-full flex-col gap-4 lg:max-w-[50%]">
        <div className="relative flex w-full flex-col gap-2">
          <Label className="flex items-center gap-4 text-sm text-muted-foreground">
            Shop Name
          </Label>
          <span className="relative min-h-[2.5rem] rounded-lg border px-3 py-2 text-sm">
            {shop?.name}
          </span>
        </div>
        <div className="relative flex w-full flex-col gap-2">
          <Label className="flex items-center gap-4 text-sm text-muted-foreground">
            Description
          </Label>
          <span className="relative min-h-[2.5rem] rounded-lg border px-3 py-2 text-sm">
            {shop?.description}
          </span>
        </div>
      </div>
      {session?.user.role === "root" && shop && (
        <ShopUpdateForm
          dialogID={`shop-update-dialog-${shop.id}`}
          shop={shop}
        />
      )}
    </div>
  );
};

export { ShopInfo };
