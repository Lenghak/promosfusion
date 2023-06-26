import { CouponProvide } from "@/components/modules/coupon/coupon-provide";
import { PageTitle } from "@/components/modules/page-title";

import { getCurrentUser } from "@/lib/next-auth";

export default async function Dashboard() {
  const session = await getCurrentUser();
  return (
    <div>
      <PageTitle
        title="Dashboard"
        description="View all your visual data associated with coupons"
      />
      <pre>
        <CouponProvide campaignId="1" />
      </pre>
    </div>
  );
}
