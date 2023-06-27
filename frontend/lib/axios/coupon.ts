import { useAxiosAuth } from "@/hooks/use-axios-auth";
import { AxiosResponse } from "axios";

import { axios } from "./axios";

import {
  Coupon,
  CouponRequestResponse,
  CouponResponse,
  CouponVerifyResponse,
} from "@/types/coupon";

const useProvideCoupon: (
  campaignId: string
) => () => Promise<AxiosResponse<CouponResponse>> = (campaignId: string) => {
  const authorizedAxios = useAxiosAuth();
  return () => authorizedAxios.post(`/campaigns/${campaignId}/provide`);
};

const getCoupon: (couponId: string) => Promise<CouponResponse> = async (
  couponId: string
) => {
  return (await axios.get(`/coupons/${couponId}`)).data;
};

const useRequestCoupon: (
  couponId: string,
  token: string
) => () => Promise<AxiosResponse<CouponRequestResponse>> = (
  couponId: string,
  token
) => {
  return () =>
    axios.post<CouponRequestResponse>(`/coupons/${couponId}/request`, {
      token: token,
    });
};

const useVerifyCoupon = (couponId: string, token: string) => {
  const authorizedAxios = useAxiosAuth();
  return () =>
    authorizedAxios.post<CouponVerifyResponse>(`/coupons/${couponId}/verify`, {
      token: token,
    });
};

export { useProvideCoupon, useRequestCoupon, getCoupon, useVerifyCoupon };
