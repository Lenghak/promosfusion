import { Campaign } from "@/components/modules/campaign/campaign-table-columns";
import { getCampaigns, useGetCampaign, useGetCampaigns } from "@/lib/axios/campaign";

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

const useGetCampaignService = (campaignId: string) => {
  const getCampaign = useGetCampaign(campaignId);
  return useQuery({
    queryKey: ["campaign"],
    queryFn: async () => (await getCampaign()),
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

export { useGetCampaignsService, useGetCampaignService };