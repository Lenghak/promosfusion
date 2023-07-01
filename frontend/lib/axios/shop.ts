import { authorizeAxios } from "@/lib/axios/authorize";

import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { CreateShopData, UpdateShopData } from "@/types/shop";

//* shop list getter for SSR
const getShops = async () => {
  const authorizedAxios = await authorizeAxios();
  return (await authorizedAxios.get("/shops")).data;
};

//* individual shop getter for SSR
const getShop = async (shopID: string) => {
  const authorizedAxios = await authorizeAxios();
  return (await authorizedAxios.get(`/shops/${shopID}`)).data;
};

//* shops list getter hook for client side
const useGetShops = () => {
  const authorizedAxios = useAxiosAuth();
  return async () => authorizedAxios.get("/shops");
};

//* individual shop getter hook for client side
const useGetShop = () => {
  const authorizedAxios = useAxiosAuth();
  return async (shopId: string) => authorizedAxios.get(`/shops/${shopId}`);
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
    authorizedAxios.put(`/shops/${shopId}`);
};

//* shop deleter hook
const useDeleteShop = () => {
  const authorizedAxios = useAxiosAuth();
  return async (shopId: string) => authorizedAxios.delete(`/shops/${shopId}`);
};

export {
  useGetShops,
  useDeleteShop,
  useUpdateShop,
  useCreateShop,
  getShops,
  useGetShop,
  getShop,
};
