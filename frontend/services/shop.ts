import {
  useAssignShop,
  useCreateShop,
  useDeleteShop,
  useDismissShop,
  useGetShop,
  useGetShops,
  useUpdateShop,
} from "@/lib/axios/shop";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import {
  AssignShopData,
  CreateShopData,
  DismissShopData,
  UpdateShopData,
} from "@/types/shop";

//* get shops services for client side
const useGetShopsService = () => {
  const getShops = useGetShops();
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["shops"],
    queryFn: async () => (await getShops()).data,
    enabled: !!session,
  });
};

//* get individual shop service for client side
const useGetShopService = (shopId: string) => {
  const getShop = useGetShop();
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["shops", shopId],
    queryFn: async () => (await getShop(shopId)).data,
    enabled: !!session,
  });
};

//* use create shop service for creating a shop
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
      await queryClient.invalidateQueries(["shops"]);
    },
  });
};

//* use delete shop service for deleting shop
const useDeleteShopService = () => {
  const deleteShop = useDeleteShop();
  return useMutation({
    mutationKey: ["shop-delete"],
    mutationFn: async (shopId: string) => await deleteShop(shopId),
    // onSettled: async () => {
    //   await queryClient.invalidateQueries(["shops"]);
    // },
  });
};

//* use assign shop service for assigning shop to user
const useAssignShopService = () => {
  const queryClient = useQueryClient();
  const assignShop = useAssignShop();

  return useMutation({
    mutationKey: ["shop-assign"],
    mutationFn: async (data: AssignShopData) => await assignShop(data),
    onSettled: async () => {
      await queryClient.invalidateQueries(["shops", "members"]);
    },
  });
};

const useDismissShopService = () => {
  const queryClient = useQueryClient();
  const dismissShop = useDismissShop();

  return useMutation({
    mutationKey: ["shop-assign"],
    mutationFn: async (data: DismissShopData) => await dismissShop(data),
    onSettled: async () => {
      await queryClient.invalidateQueries(["shops", "members"]);
    },
  });
};

export {
  useAssignShopService,
  useDismissShopService,
  useDeleteShopService,
  useCreateShopService,
  useUpdateShopService,
  useGetShopService,
  useGetShopsService,
};
