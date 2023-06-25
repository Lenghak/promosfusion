import { useAxiosAuth } from "@/hooks/use-axios-auth";
import { AxiosResponse } from "axios";

import { axios } from "./axios";

import { CouponProvideResponse, CouponRequestResponse } from "@/types/coupon";

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
        return res;
      });
};

const getCoupon: (couponId: string) => Promise<CouponProvideResponse> = async (
  couponId: string
) => {
  return axios.get(`/coupons/${couponId}`).then((res) => res.data);
};

const useRequestCoupon: (
  couponId: string
) => () => Promise<AxiosResponse<CouponRequestResponse>> = (
  couponId: string
) => {
  const authorizedAxios = useAxiosAuth();
  return () => authorizedAxios.post(`/coupons/${couponId}/requset`);
};

const useVerifyCoupon = (couponId: string, token: string) => {
  const authorizedAxios = useAxiosAuth();
  return () =>
    authorizedAxios.post(`/coupons/${couponId}/verify`, {
      token: token,
    });
};

export { useProvideCoupon, useRequestCoupon, getCoupon, useVerifyCoupon };
