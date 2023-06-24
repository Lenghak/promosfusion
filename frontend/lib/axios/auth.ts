import { useAxiosAuth } from "@/hooks/use-axios-auth";
import { UserRegisterCredentials, UserSignInCredentails } from "@/types/auth";

import { axios } from "./axios";

const signUpService = (data: UserRegisterCredentials) =>
  axios.post("/auth/register", data, {
    withCredentials: true,
  });

const signInService = (data: UserSignInCredentails) =>
  axios.post("/auth/login", data, {
    withCredentials: true,
  });

const useSignOut = () => {
  const authorizedAxios = useAxiosAuth();
  return () => authorizedAxios.get("/auth/logout");
};

export { signUpService, signInService, useSignOut };
