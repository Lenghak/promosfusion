"use client";

import { DataTable } from "@/components/ui/data-table";

import { useGetCampaignService } from "@/services/campaign";
import { useGetCouponsService } from "@/services/coupon";

import { columns } from "./campaign-coupons-table-columns";

type CampaignCouponsTableProps = {
  id?: number | string;
  cauid?: string;
  status?: string;
  createdDate?: string;
  verifyDate?: string;
  // Phone?: number;
  verifiedBy?: string;
};

const CampaignCouponsTable = ({ id }: CampaignCouponsTableProps) => {
  const {
    data: campaign,
    isError: isGetCampaignsError,
    isLoading: isGettingCampaigns,
    isFetching: isFetchingCampaigns,
  } = useGetCampaignService("campaignId");

  const { data } = useGetCouponsService(`${id!!}`);

  console.log(data);

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
