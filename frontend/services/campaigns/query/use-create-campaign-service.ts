import { useMutation, useQueryClient } from "@tanstack/react-query";

import useCreateCampaign from "../axios/use-create-campaign";

import { type CreateCampaignData } from "@/types/campaign";

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

export { useCreateCampaignService as default };
