import { PageTitle } from "@/components/modules/page-title";
import { UnderConstruction } from "@/components/modules/under-construction/under-construction";

export default async function Dashboard() {
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
