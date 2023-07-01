"use client";

import { MemberCreateForm } from "@/components/modules/member";
import { ShopColumns } from "@/components/modules/shop";
import { DataTable } from "@/components/ui/data-table";

import { useGetShopsService } from "@/services/shop";

type ShopTableProps = {};

const ShopDataTable = ({}: ShopTableProps) => {
  const { data: shops } = useGetShopsService();

  return (
    <div className="h-full">
      <DataTable
        widget={<MemberCreateForm />}
        data={shops?.data ?? []}
        columns={ShopColumns}
        filterBy="name"
        tableContainerClass="h-[60vh] overflow-y-auto"
      />
    </div>
  );
};

export { ShopDataTable };
