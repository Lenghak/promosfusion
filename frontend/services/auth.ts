import { signInService, signUpService } from "@/lib/axios/auth";

import { UserRegisterCredentials, UserSignInCredentails } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

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
      await signInService(data),
  });
};

export { useSignUpService, useSignInService };
