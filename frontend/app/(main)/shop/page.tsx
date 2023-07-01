import { PageTitle } from "@/components/modules/page-title";

import { getShops } from "@/lib/axios/shop";
import { getQueryClient } from "@/lib/react-query";

import { dehydrate, Hydrate } from "@tanstack/react-query";

export default async function Shop() {
  //* Shop page will be handled by role.
  //* If the role is admin, show all the list of created shop
  //* If the role is vendor, show the shop that he/she has been assigned for
  //* If there is no shop for the admin role. Show the create shop button.

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["shops"], async () => await getShops());
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <PageTitle
        title="Shops"
        description="View the list of your shops"
      />
      <Hydrate state={dehydratedState}>{/*<MemberDataTable />*/}</Hydrate>
    </div>
  );
}
