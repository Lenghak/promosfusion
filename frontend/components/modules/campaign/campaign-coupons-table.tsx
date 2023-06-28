"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import { useGetCampaignsService } from "@/services/campaign";

import { columns } from "./campaign-table-columns";

type CampaignCouponsTableProps = {
  id?: number;
  cid?: string;
  createdDate?: string;
  verifyDate?: string;
  Phone?: number;
  verifiedBy?: string;
};

const CampaignCouponsTable = ({}: CampaignCouponsTableProps) => {
  const {
    data: coupons,
    isError: isGetCampaignsError,
    isLoading: isGettingCampaigns,
    isFetching: isFetchingCampaigns,
  } = useGetCampaignsService();

  console.log(coupons?.data);

  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        data={coupons?.data || []}
      />
    </div>
  );
};

export { CampaignCouponsTable };
