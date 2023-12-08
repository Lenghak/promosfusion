import { useMutation } from "@tanstack/react-query";

import useDismissShop from "../axios/use-dismiss-shop";

import { type DismissShopData } from "@/types/shop";

const useDismissShopService = () => {
  const dismissShop = useDismissShop();

  return useMutation({
    mutationKey: ["shop-assign"],
    mutationFn: async ({
      shopId,
      data,
    }: {
      shopId: string | number;
      data: DismissShopData;
    }) => await dismissShop(shopId, data),
  });
};

export { useDismissShopService as default };
