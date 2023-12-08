import { useQuery } from "@tanstack/react-query";

import useGetCampaign from "../axios/use-get-campaign";

const useGetCampaignService = (campaignId: string) => {
  const getCampaign = useGetCampaign(campaignId);
  return useQuery({
    queryKey: ["campaigns", campaignId],
    queryFn: async () => (await getCampaign()).data,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

export { useGetCampaignService as default };
