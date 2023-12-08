import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { type CreateCampaignData } from "@/types/campaign";

const useCreateCampaign = () => {
  const authorizedAxios = useAxiosAuth();
  return async (data: CreateCampaignData) =>
    authorizedAxios.post("/campaigns", data);
};

export { useCreateCampaign as default };
