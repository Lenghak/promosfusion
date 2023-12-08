import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import useGetShops from "../axios/use-get-shops";

//* get shops services for client side
const useGetShopsService = () => {
  const getShops = useGetShops();
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["shops"],
    queryFn: async () => await getShops(),
    enabled: !!session,
  });
};

export { useGetShopsService as default };
