"use client";

import { useGetShopService } from "@/services/shop";

import { ShopBasicLogo } from "./shop-basic-logo";
import { ShopInfo } from "./shop-info";

type ShopInfoBasicProps = { shopId: string };

const ShopInfoBasic = ({ shopId }: ShopInfoBasicProps) => {
  const { data: shop } = useGetShopService(shopId);

  return (
    <section className="flex h-full w-full flex-col gap-4">
      <ShopBasicLogo logo={shop?.data.logo} />

      <ShopInfo shop={shop?.data} />
    </section>
  );
};

export { ShopInfoBasic };
