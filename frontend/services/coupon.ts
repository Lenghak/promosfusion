import { useProvideCoupon } from "@/lib/axios/coupon";

import { useMutation } from "@tanstack/react-query";

const useProvideCouponService = (campaignId: string) => {
  const provideCoupon = useProvideCoupon(campaignId);

  return useMutation({
    mutationKey: ["coupon", "provide"],
    mutationFn: async () => await provideCoupon(),
  });
};

export { useProvideCouponService };
