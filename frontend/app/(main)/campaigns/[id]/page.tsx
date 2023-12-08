import { CampaignDetailsCard } from "@/components/modules/campaign";
import { CampaignCouponsTable } from "@/components/modules/campaign/campaign-coupons-table";
import { PageTitle } from "@/components/modules/page-title";

import { getCoupons } from "@/lib/axios/coupon";
import { getQueryClient } from "@/lib/react-query";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type CampaignDetailsProps = {
  params: {
    id: string;
  };
};

export default async function CampaignDetails({
  params,
}: CampaignDetailsProps) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["coupons", params.id],
    queryFn: async () => await getCoupons(params.id),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex flex-col">
      <div className="px-4">
        <PageTitle
          title="Campaign Detail"
          description="Views the details and lists of your coupons"
        />
      </div>
      <div className="px-4">
        <CampaignDetailsCard id={params.id} />
      </div>
      <HydrationBoundary state={dehydratedState}>
        <CampaignCouponsTable id={params.id} />
      </HydrationBoundary>
    </div>
  );
}
