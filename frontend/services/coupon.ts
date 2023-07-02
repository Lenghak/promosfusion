import {
  getCoupon,
  useGetCoupons,
  useProvideCoupon,
  useRequestCoupon,
  useVerifyCoupon,
} from "@/lib/axios/coupon";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useProvideCouponService = (campaignId: string) => {
  const provideCoupon = useProvideCoupon(campaignId);
  return useMutation({
    mutationKey: ["coupon-provide"],
    mutationFn: async () => await provideCoupon(),
  });
};

const useGetCouponService = (couponId: string) => {
  return useQuery({
    queryKey: ["coupons", couponId],
    queryFn: async () => await getCoupon(couponId),
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

const useRequestCouponService = (couponId: string, token: string) => {
  const requestCoupon = useRequestCoupon(couponId, token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["coupon-request"],
    mutationFn: async () => (await requestCoupon()).data,
    onSettled: async () => {
      await queryClient.invalidateQueries(["coupons"]);
    },
  });
};

const useVerifyCouponService = (couponId: string, token: string) => {
  const verifyCoupon = useVerifyCoupon(couponId, token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["coupon-verify"],
    mutationFn: async () => (await verifyCoupon()).data,
    onSettled: async () => {
      await queryClient.invalidateQueries(["coupons"]);
    },
  });
};

const useGetCouponsService = (campaignId: string) => {
  const getCoupons = useGetCoupons(campaignId);

  const { data: session } = useSession();

  return useQuery({
    queryKey: ["coupons"],
    queryFn: async () => await getCoupons(),
    enabled: !!session,
  });
};

export {
  useProvideCouponService,
  useGetCouponService,
  useRequestCouponService,
  useVerifyCouponService,
  useGetCouponsService,
};
