"use client";

import { useGetMembersService } from "@/services/member";

type MemberDataTableProps = {};

const MemberDataTable = ({}: MemberDataTableProps) => {
  const { data: members } = useGetMembersService();

  console.log(members);

  return <div>MemberDataTable</div>;
};

export { MemberDataTable };
