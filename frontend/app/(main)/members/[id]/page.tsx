import { MemberInfoView } from "@/components/modules/member";
import { PageTitle } from "@/components/modules/page-title";

import { getMember } from "@/lib/axios/member";
import { getQueryClient } from "@/lib/react-query";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type MemberViewProps = {
  params: { id: string };
};

export default async function MemberView({ params }: MemberViewProps) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["members", params.id],
    queryFn: async () => await getMember(params.id),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <section className="h-full max-h-[90vh] w-full overflow-auto px-4">
      <PageTitle
        title="Member Profile"
        description="View gathered basic information on member all in one place."
      />
      <HydrationBoundary state={dehydratedState}>
        {/* The Data Components */}
        <MemberInfoView id={params.id} />
      </HydrationBoundary>
    </section>
  );
}
