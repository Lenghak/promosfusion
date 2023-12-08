import { authorizeAxios } from "@/lib/axios/authorize";

import { type Campaigns } from "@/types/campaign";

const getCampaigns: () => Promise<Campaigns> = async () => {
  const axios = await authorizeAxios();
  return axios.get<Campaigns>("/campaigns").then((res) => res.data);
};

export { getCampaigns as default };
