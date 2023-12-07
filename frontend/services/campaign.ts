import {
  useCreateCampaign,
  useDeleteCampaign,
  useGetCampaign,
  useGetCampaigns,
  useUpdateCampaign,
} from "@/lib/axios/campaign";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  type CreateCampaignData,
  type UpdateCampaignData,
} from "@/types/campaign";

const useGetCampaignsService = () => {
  const getCampaigns = useGetCampaigns();
  return useQuery({
    queryKey: ["campaigns"],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
      await queryClient.invalidateQueries({
        queryKey: ["campaigns"],
      });
    },
  });
};

const useUpdateCampaignService = () => {
  const updateCampaign = useUpdateCampaign();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["campaign-update"],
    mutationFn: async ({
      campaignId,
      data,
    }: {
      campaignId: string;
      data: UpdateCampaignData;
    }) => await updateCampaign(campaignId, data),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["campaigns"],
      });
    },
  });
};

const useDeleteCampaignService = () => {
  const deleteCampaign = useDeleteCampaign();
  return useMutation({
    mutationKey: ["campaign-delete"],
    mutationFn: async (campaignId: string) => await deleteCampaign(campaignId),
    // onSettled: async () => {
    //   await queryClient.invalidateQueries({
    // queryKey : ["campaigns"]
    // });
    // },
  });
};

export {
  useCreateCampaignService,
  useDeleteCampaignService,
  useGetCampaignService,
  useGetCampaignsService,
  useUpdateCampaignService,
};
