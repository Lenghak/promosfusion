import { Dispatch, SetStateAction, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import { useToast } from "@/hooks/use-toast";
import { AxiosError, isAxiosError } from "axios";

const useHandleCreatedEffect = (
  isError: boolean,
  isSuccess: boolean,
  setDialogStates: Dispatch<
    SetStateAction<{
      dialogOpen: boolean;
      alertOpen: boolean;
      confirmClose: boolean;
    }>
  >,
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
      setDialogStates((prev) => ({ ...prev, dialogOpen: false }));
      toast({
        title: "Member Created Successfully",
      });
    }
  }, [isError, isSuccess, toast, setDialogStates, form, error]);
};

export { useHandleCreatedEffect };
