import { useMutation, useQueryClient } from "@tanstack/react-query";

import useUpdateShop from "../axios/use-update-shop";

import { type UpdateShopData } from "@/types/shop";

//* use update shop service for updating shop info
const useUpdateShopService = () => {
  const updateShop = useUpdateShop();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["shop-update"],
    mutationFn: async ({
      shopId,
      data,
    }: {
      shopId: string;
      data: UpdateShopData;
    }) => await updateShop(shopId, data),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shops"],
      });
    },
  });
};

export { useUpdateShopService as default };
