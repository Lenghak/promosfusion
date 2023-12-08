import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { type Shop } from "@/types/shop";

//* individual shop getter hook for client side
const useGetShop = () => {
  const authorizedAxios = useAxiosAuth();
  return async (shopId: string) =>
    authorizedAxios
      .get<{ data: Shop }>(`/shops/${shopId}`)
      .then((res) => res.data);
};

export { useGetShop as default };
