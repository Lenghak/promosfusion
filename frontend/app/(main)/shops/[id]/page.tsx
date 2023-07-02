import { PageTitle } from "@/components/modules/page-title";

import { getShop } from "@/lib/axios/shop";
import { getQueryClient } from "@/lib/react-query";

import { dehydrate, Hydrate } from "@tanstack/react-query";

type ShopProps = {
  params: {
    id: string;
  };
};

export default function Shop({ params }: ShopProps) {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(
    ["shops", params.id],
    async () => await getShop(params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <PageTitle
        title="Shops Profile"
        description="View the detail of your shop"
      />
      <Hydrate state={dehydratedState}>{/*<ShopDataTable />*/}</Hydrate>
    </div>
  );
}
