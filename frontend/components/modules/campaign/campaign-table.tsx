"use client";

import dynamic from "next/dynamic";

import useGetCampaignsService from "@/services/campaigns/query/use-get-campaigns-service";

import { type ColumnDef } from "@tanstack/react-table";

const DataTable = dynamic(
  () => import("@/components/ui/data-table/data-table"),
);

const CampaignCreateForm = dynamic(
  () => import("@/components/modules/campaign/campaign-create-form"),
);

type CampaignTableProps = {
  id?: number;
  name?: string;
  description?: string;
  createdCoupon?: number;
  creatableCoupon?: number;
  couponType?: string;
  createdDate?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
};

const CampaignTable = async ({}: CampaignTableProps) => {
  const { data: campaigns } = useGetCampaignsService();

  return (
    <div>
      <DataTable
        widget={<CampaignCreateForm />}
        filterBy="name"
        tableContainerClass="h-[59vh] overflow-y-auto"
        columns={
          (await import("@/components/modules/campaign/campaign-table-columns"))
            .default as ColumnDef<unknown, unknown>[]
        }
        data={campaigns?.data || []}
      />
    </div>
  );
};

export { CampaignTable as default };
