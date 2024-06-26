import { PageTitle } from "@/components/modules/page-title";
import { ShopInfoView } from "@/components/modules/shop/shop-info-view";

import { getQueryClient } from "@/lib/react-query";
import getShop from "@/services/shops/ssr/get-shop";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type ShopProps = {
  params: {
    id: string;
  };
};

export default async function Shop({ params }: ShopProps) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["shops", params.id],
    queryFn: async () => await getShop(params.id),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <PageTitle
        className="px-4"
        title="Shop Detail"
        description="View the detail of your shop"
      />
      <HydrationBoundary state={dehydratedState}>
        <ShopInfoView shopId={params.id} />
      </HydrationBoundary>
    </div>
  );
}
