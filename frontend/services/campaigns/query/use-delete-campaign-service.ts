import { useMutation, useQueryClient } from "@tanstack/react-query";

import useDeleteCampaign from "../axios/use-delete-campaign";

const useDeleteCampaignService = () => {
  const deleteCampaign = useDeleteCampaign();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["campaign-delete"],
    mutationFn: async (campaignId: string) => await deleteCampaign(campaignId),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["campaigns"],
      });
    },
  });
};

export { useDeleteCampaignService as default };
