import { CampaignTable, CampaignTitle } from "@/components/modules/campaign";

import { getCampaigns } from "@/lib/axios/campaign";
import { getQueryClient } from "@/lib/react-query";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Campaigns() {
  await getQueryClient().prefetchQuery({
    queryKey: ["campaigns"],
    queryFn: async () => await getCampaigns(),
  });
  const dehydratedState = dehydrate(getQueryClient());

  return (
    <div className="flex flex-col">
      <div className="px-4">
        <CampaignTitle />
      </div>
      <div>
        <HydrationBoundary state={dehydratedState}>
          <CampaignTable />
        </HydrationBoundary>
      </div>
    </div>
  );
}
