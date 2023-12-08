import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAssignShop from "../axios/use-assign-shop";

import { type AssignShopData } from "@/types/shop";

//* use assign shop service for assigning shop to user
const useAssignShopService = () => {
  const queryClient = useQueryClient();
  const assignShop = useAssignShop();

  return useMutation({
    mutationKey: ["shop-assign"],
    mutationFn: async ({
      shopId,
      data,
    }: {
      shopId: string | number;
      data: AssignShopData;
    }) => await assignShop(shopId, data),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shops"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
  });
};

export { useAssignShopService as default };
