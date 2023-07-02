import { authorizeAxios } from "@/lib/axios/authorize";

import { useAxiosAuth } from "@/hooks/use-axios-auth";
import { AxiosResponse } from "axios";

import { axios } from "./axios";

import {
  CouponRequestResponse,
  CouponResponse,
  Coupons,
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

//* get coupon list for SSR
const getCoupons = async (campaignId: string) => {
  const authorizedAxios = await authorizeAxios();
  return (
    await authorizedAxios.get<Coupons>(`/campaigns/${campaignId}/coupons`)
  ).data;
};

//* get coupon list for client side
const useGetCoupons = (campaignId: string) => {
  const authorizedAxios = useAxiosAuth();
  return () => authorizedAxios.get<Coupons>(`/campaigns/${campaignId}/coupons`);
};

export {
  useProvideCoupon,
  useRequestCoupon,
  getCoupon,
  useGetCoupons,
  useVerifyCoupon,
  getCoupons,
};
