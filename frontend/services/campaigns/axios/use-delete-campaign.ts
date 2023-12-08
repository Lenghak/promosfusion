import { useAxiosAuth } from "@/hooks/use-axios-auth";

const useDeleteCampaign = () => {
  const authorizedAxios = useAxiosAuth();
  return async (campaignId: string) =>
    authorizedAxios.delete(`/campaigns/${campaignId}`);
};

export { useDeleteCampaign as default };
