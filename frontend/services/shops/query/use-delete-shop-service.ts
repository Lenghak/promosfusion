import { useMutation, useQueryClient } from "@tanstack/react-query";

import useDeleteShop from "../axios/use-delete-shop";

//* use delete shop service for deleting shop
const useDeleteShopService = () => {
  const deleteShop = useDeleteShop();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["shop-delete"],
    mutationFn: async (shopId: string) => await deleteShop(shopId),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shops"],
      });
    },
  });
};

export { useDeleteShopService as default };
