"use client";

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import { useRouter } from "next/navigation";

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

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isError) {
      toast({
        title: "Account deleted failed",
        description: "There was an error deleting the account.",
      });
    }

    if (isSuccess) {
      toast({
        title: "Account deleted Successfully",
        description: "User that the account can no longer logged in",
        variant: "destructive",
      });
      queryClient.invalidateQueries(["members"]).then();
      replace("/members");
    }
  }, [replace, isError, isSuccess, toast, queryClient]);
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

export {
  useHandleCreatedEffect,
  useHandleDeleteEffect,
  useHandleUpdatedEffect,
};
