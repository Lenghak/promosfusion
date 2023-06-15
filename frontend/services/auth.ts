import { signUpService } from "@/lib/axios/auth";

import { UserRegisterCredentials, UserSignInCredentails } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

const useSignUpService = () => {
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (data: UserRegisterCredentials) =>
      await signUpService(data),
  });
};

const useSignInService = () => {
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (data: UserSignInCredentails) =>
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/sign-in",
        redirect: false,
      }),
  });
};

export { useSignUpService, useSignInService };
