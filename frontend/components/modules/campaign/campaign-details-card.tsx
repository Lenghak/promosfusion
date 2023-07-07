"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { useGetCampaignService } from "@/services/campaign";
import { useGetMemberService } from "@/services/member";

import { number } from "zod";

import { CouponDetailPBandPrice } from "@/types/campaign";
import { CouponDetailBOGO } from "@/types/campaign";

const getStatusBadgeColor = (status: string) => {
  // Customize badge color based on the status value
  if (status === "new") {
    return "bg-primary hover:bg-primary/80";
  } else if (status === "valid") {
    return "bg-green-500 hover:bg-green-500/80";
  } else if (status === "verified") {
    return "bg-yellow-500 hover:bg-yellow-500/80";
  } else {
    return "bg-red-500 hover:bg-red-500/80";
  }
};

type CampaignDetailsCardProps = {
  id?: number | string;
  status?: string;
  createdDate?: string;
};

const CampaignDetailsCard = ({ id }: CampaignDetailsCardProps) => {
  const {
    data: campaign,
    isError: isGetCampaignsError,
    isLoading: isGettingCampaigns,
    isFetching: isFetchingCampaigns,
  } = useGetCampaignService(`${id!!}`);

  // console.log(campaign?.couponDetail.value);

  let userId = campaign?.coupons[0]?.transactions[0]?.createdBy;

  const { data: user } = useGetMemberService(`${userId!!}`);

  let createdCoupon;
  if (campaign && campaign.maxCreatableCoupon && campaign.creatableCoupon) {
    createdCoupon = campaign.maxCreatableCoupon - campaign.creatableCoupon;
  }

  const formattedDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const formattedDateWithTimeZone = (date: string): string => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    const formatted = newDate.toLocaleDateString("en-GB", options);
    return formatted;
  };

  return (
    <Card>
      <CardContent className="px-6 py-4">
        {isGettingCampaigns ? (
          <div>Loading campaign detail...</div>
        ) : isGetCampaignsError ? (
          <div>Error loading campaign detail</div>
        ) : (
          campaign && (
            <div className="grid grid-flow-row grid-cols-2 text-sm">
              <div className="grid grid-flow-row gap-1">
                <div className="grid grid-flow-col grid-cols-2">
                  <div className="text-muted-foreground">ID</div>
                  <div>{campaign?.id}</div>
                </div>
                <div className="grid grid-flow-col grid-cols-2">
                  <div className="text-muted-foreground">Name</div>
                  <div>{campaign?.name}</div>
                </div>
                <div className="grid grid-flow-col grid-cols-2">
                  <div className="text-muted-foreground">Description</div>
                  <div>{campaign?.description}</div>
                </div>
                <div className="grid grid-flow-col grid-cols-2">
                  <div className="text-muted-foreground">Coupon</div>
                  <div>
                    {createdCoupon} / {campaign?.maxCreatableCoupon}
                  </div>
                </div>
                <div className="grid grid-flow-col grid-cols-2">
                  <div className="text-muted-foreground">Coupon Type</div>
                  <div>{campaign?.couponType}</div>
                </div>
                <div className="grid grid-flow-col grid-cols-2">
                  <div className="text-muted-foreground">Created At</div>
                  <div>
                    {formattedDateWithTimeZone(campaign?.createdAt ?? "")}
                  </div>
                </div>
              </div>
              <div className="grid grid-flow-row gap-1">
                <div className="grid grid-flow-col grid-cols-2">
                  <div className="text-muted-foreground">Created By</div>
                  {/* <div>{campaign?.coupons[0]?.transactions[0]?.createdBy}</div> */}
                  <div>{user?.data?.name}</div>
                </div>
                <div className="grid grid-flow-col grid-cols-2">
                  <div className="text-muted-foreground">Valid From</div>
                  <div>{formattedDate(campaign?.startAt ?? "")}</div>
                </div>
                <div className="grid grid-flow-col grid-cols-2">
                  <div className="text-muted-foreground">Expires At</div>
                  <div>{formattedDate(campaign?.endAt ?? "")}</div>
                </div>
                <div className="grid grid-flow-col grid-cols-2">
                  <div className="text-muted-foreground">Last Updated At</div>
                  <div>
                    {formattedDateWithTimeZone(campaign?.updatedAt ?? "")}
                  </div>
                </div>
                <div className="grid grid-flow-col grid-cols-2">
                  <div className="text-muted-foreground">
                    Coupon Type Detail
                  </div>
                  {"value" in campaign?.couponDetail ? (
                    <div>{campaign?.couponDetail?.value}%</div>
                  ) : "buy" in campaign?.couponDetail &&
                    "get" in campaign?.couponDetail ? (
                    <div>
                      Buy {campaign.couponDetail.buy} Get{" "}
                      {campaign?.couponDetail.get}
                    </div>
                  ) : (
                    <div>No Detail</div>
                  )}
                </div>
                <div className="grid grid-flow-col grid-cols-2">
                  <div className="text-muted-foreground">Status</div>
                  <div>
                    <Badge className={`${getStatusBadgeColor(campaign?.status ?? "")}`}>
                      {campaign?.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export { CampaignDetailsCard };
