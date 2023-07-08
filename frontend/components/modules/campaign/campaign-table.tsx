"use client";

import { DataTable } from "@/components/ui/data-table";

import { useGetCampaignsService } from "@/services/campaign";

import { CampaignCreateForm } from "./campaign-create-form";
import { columns } from "./campaign-table-columns";

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

const CampaignTable = ({}: CampaignTableProps) => {
  const { data: campaigns } = useGetCampaignsService();

  return (
    <div>
      <DataTable
        widget={<CampaignCreateForm />}
        filterBy="name"
        tableContainerClass="h-[59vh] overflow-y-auto"
        columns={columns}
        data={campaigns?.data || []}
      />
    </div>
  );
};

export { CampaignTable };
