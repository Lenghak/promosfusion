import { CouponProvide } from "@/components/modules/coupon/coupon-provide";

import { getCurrentUser } from "@/lib/next-auth";

export default async function Dashboard() {
  const session = await getCurrentUser();
  return (
    <pre>
      <CouponProvide campaignId="1" />
    </pre>
  );
}
