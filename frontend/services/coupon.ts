import {
  getCoupon,
  useProvideCoupon,
  useRequestCoupon,
  useVerifyCoupon,
} from "@/lib/axios/coupon";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    queryFn: async () => (await getCoupon(couponId)).data,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

const useRequestCouponService = (couponId: string) => {
  const requestCoupon = useRequestCoupon(couponId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["coupon-request"],
    mutationFn: async () => (await requestCoupon()).data,
    onMutate: async (_newState) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["coupon"] });

      // Snapshot the previous value
      const previousCoupon = queryClient.getQueryData(["coupon"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["coupon"], (old) => old);

      // Return a context object with the snapshotted value
      return { previousCoupon };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, _newState, context) => {
      queryClient.setQueryData(["coupon"], context?.previousCoupon);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["coupon"] });
    },
    retry: 3,
  });
};

const useVerifyCouponService = (couponId: string, token: string) => {
  const verifyCoupon = useVerifyCoupon(couponId, token);

  return useMutation({
    mutationKey: ["coupon-verify"],
    mutationFn: async () => (await verifyCoupon()).data,
  });
};

export {
  useProvideCouponService,
  useGetCouponService,
  useRequestCouponService,
  useVerifyCouponService,
};
