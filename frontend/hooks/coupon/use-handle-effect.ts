import { useEffect } from "react";

import { AxiosError, isAxiosError } from "axios";

import { useToast } from "../use-toast";

const useHandleVerifyEffect = (
  isError: boolean,
  isSuccess: boolean,
  error: Error | AxiosError
) => {
  const { toast } = useToast();

  useEffect(() => {
    if (isError)
      toast({
        title: "Coupon Verified Failed",
        description: isAxiosError(error)
          ? error?.response?.data.message
          : "There was an error verifying the coupon.",
        variant: "destructive",
      });

    if (isSuccess)
      toast({
        title: "Coupon Verified Successfully",
        description: "The coupon has been verified as used.",
      });
  }, [isError, isSuccess, toast]);
};

const useHandleRequestEffect = (isError: boolean, isSuccess: boolean) => {
  const { toast } = useToast();

  useEffect(() => {
    if (isError)
      toast({
        title: "Coupon Claimed Failed",
        description: "There was an error while claiming the coupon.",
        variant: "destructive",
      });

    if (isSuccess)
      toast({
        title: "Coupon Claimed Successfully",
        description: "Don't forget to copy the URL to make it yours.",
      });
  }, [isError, isSuccess, toast]);
};

export { useHandleVerifyEffect, useHandleRequestEffect };
