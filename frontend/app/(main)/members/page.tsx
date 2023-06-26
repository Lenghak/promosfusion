// This memebers page fetch the data & show he list of members
import { MemberCreateForm } from "@/components/modules/member/member-create-form";
import { PageTitle } from "@/components/modules/page-title";

// import { getQueryClient } from "@/lib/react-query";

export default function Members() {
  // const queryClient = getQueryClient()
  // queryClient.prefetchQuery([])

  return (
    <div className="flex h-full w-full flex-col">
      <PageTitle
        title="Dashboard"
        description="View all your visual data associated with coupons"
      />
      <MemberCreateForm />
    </div>
  );
}
