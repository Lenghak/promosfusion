"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const {
    data: campaigns,
    isError: isGetCampaignsError,
    isLoading: isGettingCampaigns,
    isFetching: isFetchingCampaigns,
  } = useGetCampaignsService();

  // console.log(campaigns?.data);

  return (
    <div className="p-4">
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
