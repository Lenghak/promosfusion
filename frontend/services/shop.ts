import {
  useCreateShop,
  useDeleteShop,
  useGetShop,
  useGetShops,
  useUpdateShop,
} from "@/lib/axios/shop";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { CreateShopData, UpdateShopData } from "@/types/shop";

//* get shops services
const useGetShopsService = () => {
  const getShops = useGetShops();
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["shops"],
    queryFn: async () => await getShops(),
    enabled: !!session,
  });
};

//* get individual shop service
const useGetShopService = (shopId: string) => {
  const getShop = useGetShop();
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["shop", shopId],
    queryFn: async () => (await getShop(shopId)).data,
    enabled: !!session,
  });
};

//* use create shop service
const useCreateShopService = () => {
  const createShop = useCreateShop();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["shop-create"],
    mutationFn: async (data: CreateShopData) => await createShop(data),
    onSettled: async () => {
      await queryClient.invalidateQueries(["shops"]);
    },
  });
};

//* use update shop service
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
      await queryClient.invalidateQueries(["shops"]);
      await queryClient.invalidateQueries(["shop"]);
    },
  });
};

//* use delete shop service
const useDeleteShopService = () => {
  const queryClient = useQueryClient();
  const deleteShop = useDeleteShop();
  return useMutation({
    mutationKey: ["shop-delete"],
    mutationFn: async (shopId: string) => await deleteShop(shopId),
    onSettled: async () => {
      await queryClient.invalidateQueries(["shops"]);
    },
  });
};

export {
  useDeleteShopService,
  useCreateShopService,
  useUpdateShopService,
  useGetShopService,
  useGetShopsService,
};
