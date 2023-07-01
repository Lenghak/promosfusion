import { Campaign } from "@/components/modules/campaign/campaign-table-columns";

import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { authorizeAxios } from "./authorize";
import { authorizedAxios } from "./axios";

const getCampaigns: () => Promise<Campaign[]> = async () => {
  const axios = await authorizeAxios();
  return axios.get("/campagins").then((res) => res.data);
};

const useGetCampaigns = () => {
  const axios = useAxiosAuth();
  return async () => axios.get("/campagins").then((res) => res.data);
};

const useGetCampaign = (campaignId: string) => {
  const axios = useAxiosAuth();
  return async () => axios
    .get(`/campaigns/${campaignId}`)
    .then((res) => res.data);
}

export { useGetCampaigns, getCampaigns, useGetCampaign };
