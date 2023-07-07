"use client";

import { DataTable } from "@/components/ui/data-table";

import { useGetCampaignService } from "@/services/campaign";
import { useGetCouponsService } from "@/services/coupon";

import { CouponProvide } from "../coupon/coupon-provide";
import { columns } from "./campaign-coupons-table-columns";

type CampaignCouponsTableProps = {
  id?: number | string;
  cuid?: string;
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
  } = useGetCampaignService(`${id!!}`);

  const { data: coupons } = useGetCouponsService(`${id!!}`);

  return (
    <div className="p-4">
      <DataTable
        widget={<CouponProvide campaignId={`${campaign?.id}`} />}
        allowWidget={true}
        filterBy="createdAt"
        tableContainerClass="h-[30vh] overflow-y-auto"
        columns={columns}
        data={coupons?.data?.data || []}
      />
    </div>
  );
};

export { CampaignCouponsTable };
