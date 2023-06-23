import { getCoupon, useProvideCoupon } from "@/lib/axios/coupon";

import { useMutation, useQuery } from "@tanstack/react-query";

const useProvideCouponService = (campaignId: string) => {
  const provideCoupon = useProvideCoupon(campaignId);

  return useMutation({
    mutationKey: ["coupon", "provide"],
    mutationFn: async () => await provideCoupon(),
  });
};

const useGetCouponService = (couponId: string) => {
  return useQuery({
    queryKey: ["coupon"],
    queryFn: async () => await getCoupon(couponId),
  });
};

export { useProvideCouponService, useGetCouponService };
