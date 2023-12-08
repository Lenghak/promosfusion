import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCreateShop from "../axios/use-create-shop";

import { type CreateShopData } from "@/types/shop";

//* use create shop service for creating a shop
const useCreateShopService = () => {
  const createShop = useCreateShop();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["shop-create"],
    mutationFn: async (data: CreateShopData) => await createShop(data),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shops"],
      });
    },
  });
};

export { useCreateShopService as default };
