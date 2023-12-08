import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { type DismissShopData } from "@/types/shop";

//* shop dissembler
const useDismissShop = () => {
  const authorizedAxios = useAxiosAuth();
  return async (shopId: string | number, data: DismissShopData) =>
    authorizedAxios.post(`/shops/${shopId}/dismiss`, data);
};

export { useDismissShop as default };
