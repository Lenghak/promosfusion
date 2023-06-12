import {
  UserRegisterCredentials,
  UserSignInCredentails,
} from "@/types/api/auth";

import { axios } from "./axios";

const signUpService = (data: UserRegisterCredentials) =>
  axios.post("/auth/register", data, {
    withCredentials: true,
  });

const signInService = (data: UserSignInCredentails) =>
  axios.post("/auth/login", data, {
    withCredentials: true,
  });

export { signUpService, signInService };
