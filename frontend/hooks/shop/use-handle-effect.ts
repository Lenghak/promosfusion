import { useEffect } from "react";

import { useDialogStore } from "@/lib/zustand";

import { useToast } from "@/hooks/use-toast";

const useHandleCreateEffect = (
  isError: boolean,
  isSuccess: boolean,
  dialogID: string,
  successTitle?: string,
  successDescription?: string,
  errorTitle?: string,
  errorDescription?: string
) => {
  const { openDialog } = useDialogStore((state) => state);

  const { toast } = useToast();

  useEffect(() => {
    if (isError)
      toast({
        title: errorTitle ?? "Shop Created Failed",
        description:
          errorDescription ?? "There was an error creating the shop.",
        variant: "destructive",
      });

    if (isSuccess) {
      toast({
        title: successTitle ?? "Shop Created Successfully",
        description:
          successDescription ?? "The shop can now be used to manage coupons.",
      });
      openDialog(false, dialogID);
    }
  }, [
    isError,
    isSuccess,
    dialogID,
    toast,
    openDialog,
    successTitle,
    successDescription,
    errorTitle,
    errorDescription,
  ]);
};

const useHandleUpdatedEffect = (
  isError: boolean,
  isSuccess: boolean,
  dialogId: string
) => {
  useHandleCreateEffect(
    isError,
    isSuccess,
    dialogId,
    "Shop Updated Successfully",
    "You can now see the updated data.",
    "Shop Updated Failed",
    "There was a problem updating your shop."
  );
};

const useHandleDeleteEffect = (
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean
) => {
  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        title: "Shop Deleted Failed",
        description: "There was an error deleting the shop.",
        variant: "destructive",
      });
    }

    if (isSuccess) {
      toast({
        title: "Shop Deleted Successfully",
        description:
          "The shop data has been removed along with its campaigns and coupons.",
        variant: "default",
      });
    }
  }, [isError, isSuccess, isLoading, toast]);
};

export { useHandleCreateEffect, useHandleUpdatedEffect, useHandleDeleteEffect };
