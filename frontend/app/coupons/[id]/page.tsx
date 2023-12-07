import { CouponDisplay } from "@/components/modules/coupon";

import { getCoupon } from "@/lib/axios/coupon";
import { getQueryClient } from "@/lib/react-query";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type CouponProps = {
  params: { id: string };
};

export default async function Coupon({ params }: CouponProps) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["coupons", params.id],
    queryFn: () => getCoupon(params.id),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <section className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-4 overflow-y-auto rounded-lg bg-accent p-8 dark:bg-background">
      {/*//* Page title and, or back button  */}
      {/* <div className="absolute top-8 flex w-full"></div> */}
      <HydrationBoundary state={dehydratedState}>
        <CouponDisplay couponId={params.id} />
      </HydrationBoundary>
    </section>
  );
}
