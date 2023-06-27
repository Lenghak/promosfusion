// This members page fetch the data & show he list of members
import { MemberCreateForm } from "@/components/modules/member/member-create-form";
import { PageTitle } from "@/components/modules/page-title";

import { getMembers } from "@/lib/axios/member";
import { getQueryClient } from "@/lib/react-query";

import { dehydrate, Hydrate } from "@tanstack/react-query";

export default async function Members() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["members"], async () => await getMembers());
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <PageTitle
        title="Dashboard"
        description="View all your visual data associated with coupons"
      />
      <Hydrate state={dehydratedState}>
        <div className="h-[80vh] max-h-screen scroll-m-8 overflow-y-auto overflow-x-hidden">
          <MemberCreateForm />
          </div>
      </Hydrate>
    </div>
  );
}
