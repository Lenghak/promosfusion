import { useAxiosAuth } from "@/hooks/use-axios-auth";

//* shop deleter hook
const useDeleteShop = () => {
  const authorizedAxios = useAxiosAuth();
  return async (shopId: string) => authorizedAxios.delete(`/shops/${shopId}`);
};

export { useDeleteShop as default };
