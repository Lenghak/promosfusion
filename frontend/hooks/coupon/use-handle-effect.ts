import { useEffect } from "react";

import { useToast } from "../use-toast";

const useHandleVerifyEffect = (isError: boolean, isSuccess: boolean) => {
  const { toast } = useToast();

  useEffect(() => {
    if (isError)
      toast({
        description: "There was an error verifying the coupon.",
        variant: "destructive",
      });

    if (isSuccess)
      toast({
        title: "Coupon Verified Successfully",
      });
  }, [isError, isSuccess, toast]);
};

const useHandleRequestEffect = (isError: boolean, isSuccess: boolean) => {
  const { toast } = useToast();

  useEffect(() => {
    if (isError)
      toast({
        description: "There was an error while claiming the coupon.",
        variant: "destructive",
      });

    if (isSuccess)
      toast({
        title: "Coupon Claimed Successfully",
      });
  }, [isError, isSuccess, toast]);
};

export { useHandleVerifyEffect, useHandleRequestEffect };
