import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { type AssignShopData } from "@/types/shop";

//* shop assigner
const useAssignShop = () => {
  const authorizedAxios = useAxiosAuth();
  return async (shopId: string | number, data: AssignShopData) =>
    authorizedAxios.post(`/shops/${shopId}/assign`, data);
};

export { useAssignShop as default };
