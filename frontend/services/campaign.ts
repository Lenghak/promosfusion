import { Campaign } from "@/components/modules/campaign/campaign-table-columns";
import { getCampaigns, getCampaign, useGetCampaigns } from "@/lib/axios/campaign";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useGetCampaignsService = () => {
  const getCampaigns = useGetCampaigns();
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => (await getCampaigns()),
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

export { useGetCampaignsService };