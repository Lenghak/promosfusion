import {
  getCoupon,
  useProvideCoupon,
  useRequestCoupon,
  useVerifyCoupon,
} from "@/lib/axios/coupon";
import { getQueryClient } from "@/lib/react-query";

import { useMutation, useQuery } from "@tanstack/react-query";

const useProvideCouponService = (campaignId: string) => {
  const provideCoupon = useProvideCoupon(campaignId);

  return useMutation({
    mutationKey: ["coupon-provide"],
    mutationFn: async () => await provideCoupon(),
  });
};

const useGetCouponService = (couponId: string) => {
  return useQuery({
    queryKey: ["coupon"],
    queryFn: async () => await getCoupon(couponId),
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

const useRequestCouponService = (couponId: string, token: string) => {
  const requestCoupon = useRequestCoupon(couponId, token);
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["coupon-request"],
    mutationFn: async () => (await requestCoupon()).data,
    onSettled: () => {
      queryClient.invalidateQueries(["coupon"]);
    },
  });
};

const useVerifyCouponService = (couponId: string, token: string) => {
  const verifyCoupon = useVerifyCoupon(couponId, token);
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["coupon-verify"],
    mutationFn: async () => (await verifyCoupon()).data,
    onSettled: () => {
      queryClient.invalidateQueries(["coupon"]);
    },
  });
};

export {
  useProvideCouponService,
  useGetCouponService,
  useRequestCouponService,
  useVerifyCouponService,
};
