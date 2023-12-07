"use client";

import { ShopBasicLogo } from "./shop-basic-logo";
import { ShopInfo } from "./shop-info";
import { ShopInfoDelete } from "./shop-info-delete";

import { type Shop } from "@/types/shop";

type ShopInfoBasicProps = { shop?: Shop };

const ShopInfoBasic = ({ shop }: ShopInfoBasicProps) => {
  return (
    <section className="relative flex h-full w-full flex-col gap-4">
      <ShopBasicLogo logo={shop?.logo} />

      <ShopInfo shop={shop} />

      <ShopInfoDelete shop={shop} />
    </section>
  );
};

export { ShopInfoBasic };
