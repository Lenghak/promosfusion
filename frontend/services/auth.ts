import { signInService, signUpService } from "@/lib/axios/auth";

import { UserRegisterCredentials, UserSignInCredentails } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

const useSignUpService = (data: UserRegisterCredentials) => {
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async () => await signUpService(data),
  });
};

const useSignInService = (data: UserSignInCredentails) => {
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async () => await signInService(data),
  });
};

export { useSignUpService, useSignInService };
