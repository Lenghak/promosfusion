import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import { useToast } from "@/hooks/use-toast";
import { AxiosError, isAxiosError } from "axios";

const useHandleCreatedEffect = (
  dialogID: string,
  isError: boolean,
  isSuccess: boolean,
  openDialog: (state: boolean, id?: string) => void,
  error: Error | AxiosError,
  form: UseFormReturn<
    {
      name: string;
      email: string;
      password: string;
      role: "manager" | "seller";
    },
    any,
    undefined
  >
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
            description: "There was an error while creating the member.",
            variant: "destructive",
          });
    }

    if (isSuccess) {
      openDialog(false, dialogID);
      toast({
        title: "Member Created Successfully",
      });
    }
  }, [isError, isSuccess, toast, openDialog, form, error]);
};

export { useHandleCreatedEffect };
