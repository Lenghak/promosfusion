import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { type CreateShopData } from "@/types/shop";

//* shop creator hook
const useCreateShop = () => {
  const authorizedAxios = useAxiosAuth();
  return async (data: CreateShopData) => authorizedAxios.post("/shops", data);
};

export { useCreateShop as default };
