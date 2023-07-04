import { Campaign } from "@/components/modules/campaign/campaign-table-columns";

import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { authorizeAxios } from "./authorize";
import { authorizedAxios } from "./axios";
import { CreateCampaignData } from "@/types/campaign";

const getCampaigns: () => Promise<Campaign[]> = async () => {
  const axios = await authorizeAxios();
  return axios.get("/campaigns").then((res) => res.data);
};

const useGetCampaigns = () => {
  const axios = useAxiosAuth();
  return async () => axios.get("/campaigns").then((res) => res.data);
};

const useGetCampaign = (campaignId: string) => {
  const axios = useAxiosAuth();
  return async () => axios
    .get<{data: Campaign}>(`/campaigns/${campaignId}`)
    .then((res) => res.data);
}

const useCreateCampaign = () => {
  const authorizedAxios = useAxiosAuth();
  return async (data: CreateCampaignData) => authorizedAxios.post("/campaigns", data);
};

export { useGetCampaigns, getCampaigns, useGetCampaign, useCreateCampaign };
