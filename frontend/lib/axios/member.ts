import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { authorizeAxios } from "./authorize";

//* get member function for SSR
const getMembers = async () => {
  const authorizedAxios = await authorizeAxios();
  return authorizedAxios.get("/users");
};

//* get memeber function for client side
const useGetMembers = async () => {
  const authorizedAxios = useAxiosAuth();
  return () => authorizedAxios.get("/users");
};


export { getMembers, useGetMembers };
