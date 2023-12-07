"use client";

import { DataTable } from "@/components/ui/data-table";

import { useGetCampaignsService } from "@/services/campaign";

import CampaignCreateForm from "./campaign-create-form";
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: campaigns } = useGetCampaignsService();

  return (
    <div>
      <DataTable
        widget={<CampaignCreateForm />}
        filterBy="name"
        tableContainerClass="h-[59vh] overflow-y-auto"
        columns={columns}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        data={campaigns?.data || []}
      />
    </div>
  );
};

export { CampaignTable as default };
