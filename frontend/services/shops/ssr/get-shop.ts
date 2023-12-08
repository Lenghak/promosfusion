import { authorizeAxios } from "@/lib/axios/authorize";

import { type Shop } from "@/types/shop";

//* individual shop getter for SSR
const getShop = async (shopID: string) => {
  const authorizedAxios = await authorizeAxios();
  return authorizedAxios
    .get<{ data: Shop }>(`/shops/${shopID}`)
    .then((res) => res.data);
};

export { getShop as default };
