import { PageTitle } from "@/components/modules/page-title";
import { UnderConstruction } from "@/components/modules/under-construction/under-construction";

import { getCurrentUser } from "@/lib/next-auth";

export default async function Dashboard() {
  const session = await getCurrentUser();
  return (
    <div>
      <PageTitle
        title="Dashboard"
        description="View all your visual data associated with coupons"
      />
      <UnderConstruction />
    </div>
  );
}
