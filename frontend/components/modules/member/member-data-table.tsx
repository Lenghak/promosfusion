"use client";

import { DataTable } from "@/components/ui/data-table";

import { useGetMembersService } from "@/services/member";

import { useToast } from "@/hooks/use-toast";

import { MemberCreateForm } from "./member-create-form";
import { MemberColumns } from "./member-table-columns";

type MemberDataTableProps = {};

const MemberDataTable = ({}: MemberDataTableProps) => {
  const {
    data: members,
    isLoading: isQueryingMember,
    isError: isQueryMemberError,
  } = useGetMembersService();

  const { toast } = useToast();

  if (isQueryMemberError)
    toast({
      title: "Getting Member Failed",
      description: "There was a problem getting your data",
      variant: "destructive",
    });

  return (
    <div className="h-full">
      <DataTable
        widget={<MemberCreateForm />}
        data={members?.data ?? []}
        columns={MemberColumns}
        filterBy="name"
        tableContainerClass="h-[60vh] overflow-y-auto"
      />
    </div>
  );
};

export { MemberDataTable };
