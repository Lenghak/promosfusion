import { useAxiosAuth } from "@/hooks/use-axios-auth";
import { AxiosResponse } from "axios";

import { axios } from "./axios";

import { CouponProvideResponse } from "@/types/coupon";

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

const getCoupon: (couponId: string) => Promise<CouponProvideResponse> = async (
  couponId: string
) => {
  return axios.get(`/coupons/${couponId}`).then((res) => res.data);
};

const useRequestCoupon = (couponId: string) => {
  const authorizedAxios = useAxiosAuth();
  return () => authorizedAxios.post(`/coupons/${couponId}/request`);
};

const useVerifyCoupon = (couponId: string, token: string) => {
  const authorizedAxios = useAxiosAuth();
  return () =>
    authorizedAxios.post(`/coupons/${couponId}/verify`, {
      token: token,
    });
};

export { useProvideCoupon, useRequestCoupon, getCoupon, useVerifyCoupon };
