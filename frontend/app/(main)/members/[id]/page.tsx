import { getQueryClient } from "@/lib/react-query";

type MemberViewProps = {};

export default function MemberView({}: MemberViewProps) {
  const queryClient = getQueryClient();
  // queryClient.prefetchQuery(['member', "id"], async () => )

  return <section className="h-full w-full p-0"></section>;
}
