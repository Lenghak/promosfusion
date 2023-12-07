// import { CampaignTable, CampaignTitle } from "";
import { getCampaigns } from "@/lib/axios/campaign";
import { getQueryClient } from "@/lib/react-query";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

// const CampaignTitle = dynamic(
//   () => import("@/components/modules/campaign/campaign-title"),
// );

// const CampaignTable = dynamic(
//   () => import("@/components/modules/campaign/campaign-table")
// );

export default async function Campaigns() {
  await getQueryClient().prefetchQuery({
    queryKey: ["campaigns"],
    queryFn: async () => await getCampaigns(),
  });
  const dehydratedState = dehydrate(getQueryClient());

  return (
    <div className="flex flex-col">
      <div className="px-4">{/* <CampaignTitle /> */}</div>
      <div>
        <HydrationBoundary state={dehydratedState}>
          {/* <CampaignTable /> */}
        </HydrationBoundary>
      </div>
    </div>
  );
}
