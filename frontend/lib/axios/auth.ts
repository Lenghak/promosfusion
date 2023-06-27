import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { unsetAccessTokenAttachedToAxiosDefaults } from "./authorize";
import { axios } from "./axios";

import { UserRegisterCredentials, UserSignInCredentails } from "@/types/auth";

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
  unsetAccessTokenAttachedToAxiosDefaults();
  return () => authorizedAxios.get("/auth/logout");
};

export { signUpService, signInService, useSignOut };
