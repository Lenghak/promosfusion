"use client";

import { useGetShopService } from "@/services/shop";

type ShopInfoViewProps = {
  shopId: string;
};

const ShopInfoView = ({ shopId }: ShopInfoViewProps) => {
  const { data } = useGetShopService(shopId);

  return <div className={"h-full w-full"}></div>;
};

export { ShopInfoView };
