import { useAxiosAuth } from "@/hooks/use-axios-auth";
import { CouponProvideResponse } from "@/types/coupon";
import { AxiosResponse } from "axios";

import { authorizedAxios } from "./axios";

const useProvideCoupon: (
  campaignId: string
) => () => Promise<
  AxiosResponse<CouponProvideResponse>
> = (campaignId: string) => {
  const authorizedAxios = useAxiosAuth();
  return () => authorizedAxios.post(`/campagins/${campaignId}/provide`, null);
};

export { useProvideCoupon };
