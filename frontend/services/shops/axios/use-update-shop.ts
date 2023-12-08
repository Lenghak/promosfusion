import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { type UpdateShopData } from "@/types/shop";

//* shop updater hook
const useUpdateShop = () => {
  const authorizedAxios = useAxiosAuth();
  return async (shopId: string, data: UpdateShopData) =>
    authorizedAxios.put(`/shops/${shopId}`, data);
};

export { useUpdateShop as default };
