import { useAxiosAuth } from "@/hooks/use-axios-auth";
import { CouponProvideResponse } from "@/types/coupon";
import { AxiosResponse } from "axios";

import { axios } from "./axios";

const useProvideCoupon: (
  campaignId: string
) => () => Promise<AxiosResponse<CouponProvideResponse>> = (
  campaignId: string
) => {
  const authorizedAxios = useAxiosAuth();
  return () =>
    authorizedAxios
      .post(`/campagins/${campaignId}/provide`, null)
      .then((res) => {
        console.log(res.headers);
        return res;
      });
};

const getCoupon: (id: string) => Promise<CouponProvideResponse> = async (
  id: string
) => {
  return axios.get(`/coupons/${id}`).then((res) => res.data);
};

export { useProvideCoupon, getCoupon };
