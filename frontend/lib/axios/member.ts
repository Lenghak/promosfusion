import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { authorizeAxios } from "./authorize";

import { Members } from "@/types/member";

//* get member function for SSR
const getMembers = async () => {
  const authorizedAxios = await authorizeAxios();
  return authorizedAxios.get<Members>("/users");
};

//* get memeber function for client side
const useGetMembers = async () => {
  const authorizedAxios = useAxiosAuth();
  return () => authorizedAxios.get<Members>("/users");
};

export { getMembers, useGetMembers };
