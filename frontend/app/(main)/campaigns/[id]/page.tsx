import { CampaignDetailsCard } from "@/components/modules/campaign";
import { CampaignCouponsTable } from "@/components/modules/campaign/campaign-coupons-table";
import { PageTitle } from "@/components/modules/page-title";

import { getCoupons } from "@/lib/axios/coupon";
import { getQueryClient } from "@/lib/react-query";

import { dehydrate, Hydrate } from "@tanstack/react-query";

type CampaignDetailsProps = {
  params: {
    id: string;
  };
};

export default async function CampaignDetails({
  params,
}: CampaignDetailsProps) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["coupons"],
    async () => await getCoupons(params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex flex-col">
      <div>
        <PageTitle
          title="Campaign Detail"
          description="Views the details and lists of your coupons"
        />
      </div>
      <div>
        <CampaignDetailsCard />
      </div>
      <Hydrate state={dehydratedState}>
        <CampaignCouponsTable id={params.id} />
      </Hydrate>
    </div>
  );
}
