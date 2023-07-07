import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { authorizeAxios } from "./authorize";

import { Campaign, CreateCampaignData, UpdateCampaignData } from "@/types/campaign";

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
  return async () =>
    axios
      .get<{ data: Campaign }>(`/campaigns/${campaignId}`)
      .then((res) => res.data);
};

const useCreateCampaign = () => {
  const authorizedAxios = useAxiosAuth();
  return async (data: CreateCampaignData) =>
    authorizedAxios.post("/campaigns", data);
};

const useUpdateCampaign = () => {
  const authorizedAxios = useAxiosAuth();
  return async (campaignId: string, data: UpdateCampaignData) =>
    authorizedAxios.put(`/campaigns/${campaignId}`, data);
};

const useDeleteCampaign = () => {
  const authorizedAxios = useAxiosAuth();
  return async (campaignId: string) => authorizedAxios.delete(`/campaigns/${campaignId}`);
};

export { useGetCampaigns, getCampaigns, useGetCampaign, useCreateCampaign, useUpdateCampaign, useDeleteCampaign };
