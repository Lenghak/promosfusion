import { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useToast } from "@/hooks/use-toast";

import { useDialogStore } from "@/lib/zustand";

import { useQueryClient } from "@tanstack/react-query";

const useHandleCreateEffect = (
  isError: boolean,
  isSuccess: boolean,
  dialogID: string,
  successTitle?: string,
  successDescription?: string,
  errorTitle?: string,
  errorDescription?: string,
) => {
  const { openDialog } = useDialogStore((state) => state);

  const { toast } = useToast();

  useEffect(() => {
    if (isError)
      toast({
        title: errorTitle ?? "Campaign Created Failed",
        description:
          errorDescription ?? "There was an error creating the campaign.",
        variant: "destructive",
      });

    if (isSuccess) {
      toast({
        title: successTitle ?? "Campaign Created Successfully",
        description: successDescription ?? "The campaign can now be used.",
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
  dialogId: string,
) => {
  useHandleCreateEffect(
    isError,
    isSuccess,
    dialogId,
    "Campaign Updated Successfully",
    "You can now see the updated data.",
    "Campaign Updated Failed",
    "There was a problem updating your campaign.",
  );
};

const useHandleDeleteEffect = (isError: boolean, isSuccess: boolean) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (isError) {
      toast({
        title: "Campaign Deleted Failed",
        description: "There was an error deleting the campaign.",
        variant: "destructive",
      });
    }

    if (isSuccess) {
      toast({
        title: "Campaign Deleted Successfully",
        description:
          "The campaign data has been removed along with its coupons.",
        variant: "default",
      });

      pathName !== "/campaigns" ? router.replace("/campaigns") : null;
      queryClient
        .invalidateQueries({ queryKey: ["campaigns"] })
        .then((res) => res)
        .catch((err) => console.log(err));
    }
  }, [isError, isSuccess, toast, queryClient, router, pathName]);
};

export { useHandleCreateEffect, useHandleDeleteEffect, useHandleUpdatedEffect };
