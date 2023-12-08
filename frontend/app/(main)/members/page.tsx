// This members page fetch the data & show the list of members
import { MemberDataTable } from "@/components/modules/member";
import { PageTitle } from "@/components/modules/page-title";

import { getMembers } from "@/lib/axios/member";
import { getQueryClient } from "@/lib/react-query";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Members() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["members"],
    queryFn: async () => await getMembers(),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <PageTitle
        title="Members"
        description="View your list of teams and members"
      />
      <HydrationBoundary state={dehydratedState}>
        <MemberDataTable />
      </HydrationBoundary>
    </div>
  );
}
