import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { type UpdateCampaignData } from "@/types/campaign";

const useUpdateCampaign = () => {
  const authorizedAxios = useAxiosAuth();
  return async (campaignId: string, data: UpdateCampaignData) =>
    authorizedAxios.put(`/campaigns/${campaignId}`, data);
};

export { useUpdateCampaign as default };
