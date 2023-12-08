"use client";

import { ShopColumns } from "@/components/modules/shop/shop-table-columns";
import { DataTable } from "@/components/ui/data-table";


import { ShopCreateForm } from "./shop-create-form";
import useGetShopsService from "@/services/shops/query/use-get-shops-service";

const ShopDataTable = () => {
  const { data: shops } = useGetShopsService();

  return (
    <DataTable
      widget={<ShopCreateForm />}
      data={shops?.data ?? []}
      columns={ShopColumns}
      filterBy="name"
      tableContainerClass="h-[60vh] overflow-y-auto"
    />
  );
};

export { ShopDataTable };
