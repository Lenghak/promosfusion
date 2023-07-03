import { PageTitle } from "@/components/modules/page-title";
import { ShopInfoView } from "@/components/modules/shop/shop-info-view";

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
        className="px-4"
        title="Shop Detail"
        description="View the detail of your shop"
      />
      <Hydrate state={dehydratedState}>
        <ShopInfoView shopId={params.id} />
      </Hydrate>
    </div>
  );
}
