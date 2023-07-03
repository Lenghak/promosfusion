"use client";

import { useGetShopService } from "@/services/shop";

type ShopInfoBasicProps = {
  shopId: string;
};

const ShopInfoBasic = ({ shopId }: ShopInfoBasicProps) => {
  const { data } = useGetShopService(shopId);

  console.log(data);
  return <div></div>;
};

export { ShopInfoBasic };
