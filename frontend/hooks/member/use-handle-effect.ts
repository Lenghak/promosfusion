"use client";

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import { usePathname, useRouter } from "next/navigation";

import { useDialogStore } from "@/lib/zustand";

import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";

const useHandleCreatedEffect = (
  dialogID: string,
  isError: boolean,
  isSuccess: boolean,
  openDialog: (state: boolean, id?: string) => void,
  error: Error | AxiosError,
  form: UseFormReturn<{
    name: string;
    email: string;
    password: string;
    role: "manager" | "seller";
  }>
) => {
  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      isAxiosError(error)
        ? error.response?.data.errors.email &&
          form.setError("email", {
            message: "This email has already been taken",
          })
        : toast({
            title: "Member Created Failed",
            description: "There was an error while creating the member.",
            variant: "destructive",
          });
    }

    if (isSuccess) {
      openDialog(false, dialogID);
      toast({
        title: "Member Created Successfully",
        description: "User can now sign in with this account.",
      });
    }
  }, [isError, isSuccess, toast, openDialog, form, error, dialogID]);
};

const useHandleDeleteEffect = (isError: boolean, isSuccess: boolean) => {
  const { toast } = useToast();
  const { replace } = useRouter();
  const pathName = usePathname();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isError) {
      toast({
        title: "Account deleted failed",
        description: "There was an error deleting the account.",
        variant: "destructive",
      });
    }

    if (isSuccess) {
      toast({
        title: "Account deleted Successfully",
        description: "User that the account can no longer logged in",
      });
      pathName.startsWith("/members/") ? replace("/members") : null;
      queryClient.invalidateQueries(["members"]).then();
    }
  }, [replace, isError, isSuccess, toast, queryClient, pathName]);
};

const useHandleUpdatedEffect = (
  isError: boolean,
  isSuccess: boolean,
  dialogId: string
) => {
  const { toast } = useToast();
  const openDialog = useDialogStore((state) => state.openDialog);

  useEffect(() => {
    if (isError)
      toast({
        title: "Member Update Failed",
        description: "There was a problem updating the member",
        variant: "destructive",
      });

    if (isSuccess) {
      toast({
        title: "Member Updated Successfully",
        description:
          "Your changed has been saved. Your activity has been recorded.",
      });
      openDialog(false, dialogId);
    }
  }, [toast, isError, isSuccess, dialogId, openDialog]);
};

const useHandleAssignShopEffect = (
  isError: boolean,
  isSuccess: boolean,
  dialogId: string
) => {
  const { toast } = useToast();
  const { openDialog } = useDialogStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isError)
      toast({
        title: "Member Assigned Failed",
        description: "There was a problem assigning the member",
        variant: "destructive",
      });

    if (isSuccess) {
      toast({
        title: "Member Assigned Successfully",
        description: "You can view the list of assigned members in shop.",
      });
      openDialog(false, dialogId);
      queryClient.invalidateQueries(["shops"]).then((res) => res);
      queryClient.invalidateQueries(["members"]).then((res) => res);
    }
  }, [isError, isSuccess, toast, openDialog, dialogId, queryClient]);
};

const useHandleDismissShopEffect = (
  isError: boolean,
  isSuccess: boolean,
  openDialog: (state: boolean) => void
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isError)
      toast({
        title: "Member(s) Dismiss Failed",
        description: "There was a problem Dismissing the member(s)",
        variant: "destructive",
      });

    if (isSuccess) {
      toast({
        title: "Member(s) Dismissed Successfully",
        description:
          "Members has been removed from this shop. You can re-assign them back later.",
      });
      openDialog(false);
      queryClient.invalidateQueries(["shops"]).then((res) => res);
      queryClient.invalidateQueries(["members"]).then((res) => res);
    }
  }, [toast, isError, isSuccess, openDialog, queryClient]);
};

export {
  useHandleCreatedEffect,
  useHandleDeleteEffect,
  useHandleUpdatedEffect,
  useHandleAssignShopEffect,
  useHandleDismissShopEffect,
};
