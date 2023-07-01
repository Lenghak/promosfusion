"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import {
  useGetCampaignService,
  useGetCampaignsService,
} from "@/services/campaign";

import { columns } from "./campaign-coupons-table-columns";

type CampaignCouponsTableProps = {
  id?: number;
  cauid?: string;
  status?: string;
  createdDate?: string;
  verifyDate?: string;
  // Phone?: number;
  verifiedBy?: string;
};

const CampaignCouponsTable = ({}: CampaignCouponsTableProps) => {
  const {
    data: campaign,
    isError: isGetCampaignsError,
    isLoading: isGettingCampaigns,
    isFetching: isFetchingCampaigns,
  } = useGetCampaignService("campaignId");

  console.log(campaign?.data);

  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        data={campaign?.data || []}
      />
    </div>
  );
};

export { CampaignCouponsTable };
