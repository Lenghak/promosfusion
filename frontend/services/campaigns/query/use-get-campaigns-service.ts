import { useQuery } from "@tanstack/react-query";

import useGetCampaigns from "../axios/use-get-campaigns";

const useGetCampaignsService = () => {
  const getCampaigns = useGetCampaigns();
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => await getCampaigns(),
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

export { useGetCampaignsService as default };
