import { useEffect } from "react";

import { useDialogStore } from "@/lib/zustand";

import { useToast } from "@/hooks/use-toast";

const useHandleCreateEffect = (
  isError: boolean,
  isSuccess: boolean,
  dialogID: string
) => {
  const { openDialog } = useDialogStore((state) => state);

  const { toast } = useToast();

  useEffect(() => {
    if (isError)
      toast({
        title: "Shop Created Failed",
        description: "There was an error creating the shop.",
        variant: "destructive",
      });

    if (isSuccess) {
      toast({
        title: "Shop Created Successfully",
        description: "The shop can now be used to manage coupons.",
      });
      openDialog(false, dialogID);
    }
  }, [isError, isSuccess, dialogID, toast, openDialog]);
};

export { useHandleCreateEffect };
