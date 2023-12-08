import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { type Shops } from "@/types/shop";

//* shops list getter hook for client side
const useGetShops = () => {
  const authorizedAxios = useAxiosAuth();
  return async () =>
    authorizedAxios.get<Shops>("/shops").then((res) => res.data);
};

export { useGetShops as default };
