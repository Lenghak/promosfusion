import { signUpService, useSignOut } from "@/lib/axios/auth";

import { useMutation } from "@tanstack/react-query";
import { signIn, signOut } from "next-auth/react";

import { UserRegisterCredentials, UserSignInCredentails } from "@/types/auth";

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

const useSignOutService = () => {
  const signOutService = useSignOut();

  return useMutation({
    mutationKey: ["sign-out"],
    mutationFn: async () => {
      await signOut({ callbackUrl: "/sign-in", redirect: true });
      await signOutService();
    },
  });
};

export { useSignUpService, useSignInService, useSignOutService };
