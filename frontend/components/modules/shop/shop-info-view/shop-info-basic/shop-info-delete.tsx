"use client";

import { ShopDeleteForm } from "@/components/modules/shop/shop-delete-form";

import { useSession } from "next-auth/react";

import { Shop } from "@/types/shop";

const ShopInfoDelete = ({ shop }: { shop?: Shop }) => {
  const { data: session } = useSession();

  return session?.user.role === "root" ? (
    <div className="flex h-full w-full flex-col items-start justify-center gap-6 border-t p-4 lg:flex-row lg:items-center">
      <div className="flex w-full justify-between gap-2">
        <div className="flex w-full flex-col gap-1">
          <span className="text-lg font-semibold">Delete Shop</span>
          <span className="text-sm text-muted-foreground">
            Delete and remove this shop from our server along with its campaigns
            and coupons
          </span>
        </div>
      </div>

      {shop?.id && <ShopDeleteForm shopId={`${shop.id}`} />}
    </div>
  ) : null;
};

export { ShopInfoDelete };
