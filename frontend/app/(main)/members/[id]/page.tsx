import { getMember } from "@/lib/axios/member";
import { getQueryClient } from "@/lib/react-query";

import { dehydrate, Hydrate } from "@tanstack/react-query";

type MemberViewProps = {
  params: { id: string };
};

export default function MemberView({ params }: MemberViewProps) {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(
    ["member", params.id],
    async () => await getMember(params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <section className="h-full w-full p-0">
      <Hydrate state={dehydratedState}>
        
      </Hydrate>
    </section>
  );
}
