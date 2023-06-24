import { CouponDisplay } from "@/components/modules/coupon";

import { getCoupon } from "@/lib/axios/coupon";
import { getQueryClient } from "@/lib/react-query";

import { dehydrate, Hydrate } from "@tanstack/react-query";

type CouponProps = {
  params: { id: string };
};

export default async function Coupon({ params }: CouponProps) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["coupon"], () => getCoupon(params.id));
  const dehydratedState = dehydrate(queryClient);

  return (
    <section className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-4 overflow-y-auto rounded-lg bg-accent p-8 dark:bg-background">
      {/*//* Page title and, or back button  */}
      {/* <div className="absolute top-8 flex w-full"></div> */}
      <Hydrate state={dehydratedState}>
        <CouponDisplay couponId={params.id} />
      </Hydrate>
    </section>
  );
}
