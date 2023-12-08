import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { type Campaign } from "@/types/campaign";

const useGetCampaign = (campaignId: string) => {
  const axios = useAxiosAuth();
  return async () =>
    axios
      .get<{ data: Campaign }>(`/campaigns/${campaignId}`)
      .then((res) => res.data);
};

export { useGetCampaign as default };
