import { useMutation, useQueryClient } from "@tanstack/react-query";

import useUpdateCampaign from "../axios/use-update-campaign";

import { type UpdateCampaignData } from "@/types/campaign";

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

export { useUpdateCampaignService as default };
