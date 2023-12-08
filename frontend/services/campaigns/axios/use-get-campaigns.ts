import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { type Campaigns } from "@/types/campaign";

const useGetCampaigns = () => {
  const axios = useAxiosAuth();

  return async () => axios.get<Campaigns>("/campaigns").then((res) => res.data);
};

export { useGetCampaigns as default };
