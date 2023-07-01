import { getShop } from "@/lib/axios/shop";
import { getQueryClient } from "@/lib/react-query";

import { dehydrate } from "@tanstack/react-query";

type ShopProps = {
  params: {
    id: string;
  };
};

export default function Shop({ params }: ShopProps) {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(["shop"], async () => await getShop(params.id));
  const dehydratedState = dehydrate(queryClient);

  return <div></div>;
}
