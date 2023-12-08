import { authorizeAxios } from "@/lib/axios/authorize";

import { type Shops } from "@/types/shop";

//* shop list getter for SSR
const getShops = async () => {
  const authorizedAxios = await authorizeAxios();
  return authorizedAxios.get<Shops>("/shops").then((res) => res.data);
};

export { getShops as default };
