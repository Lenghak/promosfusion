import { useGetMemberService } from "@/services/member";

type MemberInfoViewProps = {
  id: string;
};

const MemberInfoView = ({ id }: MemberInfoViewProps) => {
  const {data,} = useGetMemberService(id);

  return <section className="h-full w-full"></section>;
};

export { MemberInfoView };
