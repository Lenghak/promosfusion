import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import useGetShop from "../axios/use-get-shop";

//* get individual shop service for client side
const useGetShopService = (shopId: string) => {
  const getShop = useGetShop();
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["shops", shopId],
    queryFn: async () => await getShop(shopId),
    enabled: !!session,
  });
};

export { useGetShopService as default };
