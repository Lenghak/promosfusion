"use client";

import { ShopColumns } from "@/components/modules/shop/shop-table-columns";
import { DataTable } from "@/components/ui/data-table";

import { useGetShopsService } from "@/services/shop";

import { ShopCreateForm } from "./shop-create-form";

type ShopTableProps = {};

const ShopDataTable = ({}: ShopTableProps) => {
  const { data: shops } = useGetShopsService();

  return (
    <div className="h-full">
      <DataTable
        widget={<ShopCreateForm />}
        data={shops?.data ?? []}
        columns={ShopColumns}
        filterBy="name"
        tableContainerClass="h-[60vh] overflow-y-auto"
      />
    </div>
  );
};

export { ShopDataTable };
