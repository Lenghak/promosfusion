import {
  useCreateCampaign,
  useGetCampaign,
  useGetCampaigns,
} from "@/lib/axios/campaign";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CreateCampaignData } from "@/types/campaign";

const useGetCampaignsService = () => {
  const getCampaigns = useGetCampaigns();
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => await getCampaigns(),
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

const useGetCampaignService = (campaignId: string) => {
  const getCampaign = useGetCampaign(campaignId);
  return useQuery({
    queryKey: ["campaigns", campaignId],
    queryFn: async () => (await getCampaign()).data,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

const useCreateCampaignService = () => {
  const createCampaign = useCreateCampaign();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["campaign-create"],
    mutationFn: async (data: CreateCampaignData) => await createCampaign(data),
    onSettled: async () => {
      await queryClient.invalidateQueries(["campaigns"]);
    },
  });
};

export {
  useGetCampaignsService,
  useGetCampaignService,
  useCreateCampaignService,
};
