"use client";

import { DataTable } from "@/components/ui/data-table";

import { useGetMembersService } from "@/services/member";

import { MemberCreateForm } from "./member-create-form";
import { MemberColumns } from "./member-table-columns";

type MemberDataTableProps = {};

const MemberDataTable = ({}: MemberDataTableProps) => {
  const { data: members } = useGetMembersService();

  return (
    <DataTable
      widget={<MemberCreateForm />}
      data={members?.data ?? []}
      columns={MemberColumns}
      filterBy="name"
      tableContainerClass="h-[60vh] overflow-y-auto"
    />
  );
};

export { MemberDataTable };
