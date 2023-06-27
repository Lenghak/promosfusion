"use client";

import { DataTable } from "@/components/ui/data-table";

import { useGetMembersService } from "@/services/member";

import { MemberColumns } from "./member-table-columns";

type MemberDataTableProps = {};

const MemberDataTable = ({}: MemberDataTableProps) => {
  const { data: members } = useGetMembersService();

  return (
    <div>
      {
        <DataTable
          columns={MemberColumns}
          data={members?.data ?? []}
        />
      }
    </div>
  );
};

export { MemberDataTable };
