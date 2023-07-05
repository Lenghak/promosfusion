import { authorizeAxios } from "@/lib/axios/authorize";

import { useAxiosAuth } from "@/hooks/use-axios-auth";

import {
  AssignShopData,
  CreateShopData,
  DismissShopData,
  Shop,
  Shops,
  UpdateShopData,
} from "@/types/shop";

//* shop list getter for SSR
const getShops = async () => {
  const authorizedAxios = await authorizeAxios();
  return (await authorizedAxios.get<Shops>("/shops")).data;
};

//* individual shop getter for SSR
const getShop = async (shopID: string) => {
  const authorizedAxios = await authorizeAxios();
  return (await authorizedAxios.get<{ data: Shop }>(`/shops/${shopID}`)).data;
};

//* shops list getter hook for client side
const useGetShops = () => {
  const authorizedAxios = useAxiosAuth();
  return async () => authorizedAxios.get<Shops>("/shops");
};

//* individual shop getter hook for client side
const useGetShop = () => {
  const authorizedAxios = useAxiosAuth();
  return async (shopId: string) =>
    authorizedAxios.get<{ data: Shop }>(`/shops/${shopId}`);
};

//* shop creator hook
const useCreateShop = () => {
  const authorizedAxios = useAxiosAuth();
  return async (data: CreateShopData) => authorizedAxios.post("/shops", data);
};

//* shop updater hook
const useUpdateShop = () => {
  const authorizedAxios = useAxiosAuth();
  return async (shopId: string, data: UpdateShopData) =>
    authorizedAxios.put(`/shops/${shopId}`, data);
};

//* shop deleter hook
const useDeleteShop = () => {
  const authorizedAxios = useAxiosAuth();
  return async (shopId: string) => authorizedAxios.delete(`/shops/${shopId}`);
};

//* shop assigner
const useAssignShop = () => {
  const authorizedAxios = useAxiosAuth();
  return async (shopId: string | number, data: AssignShopData) =>
    authorizedAxios.post(`/shops/${shopId}/assign`, data);
};

//* shop dissembler
const useDismissShop = () => {
  const authorizedAxios = useAxiosAuth();
  return async (shopId: string | number, data: DismissShopData) =>
    authorizedAxios.post(`/shops/${shopId}/dismiss`, data);
};

export {
  useAssignShop,
  useDismissShop,
  useGetShops,
  useDeleteShop,
  useUpdateShop,
  useCreateShop,
  getShops,
  useGetShop,
  getShop,
};
