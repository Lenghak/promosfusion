"use client";

import { columns as CampaignColumns } from "@/components/modules/campaign/campaign-table-columns";
import { DataTable } from "@/components/ui/data-table";

import { useGetShopService } from "@/services/shop";

const ShopInfoCampaigns = ({ shopId }: { shopId: string }) => {
  const { data: shop } = useGetShopService(shopId);
  return (
    <section className="flex h-full w-full flex-col gap-4">
      <div className="flex h-full w-full flex-col items-start justify-center gap-2 px-4 py-2">
        <div className="flex w-full justify-between gap-2">
          <div className="flex w-full flex-col gap-1">
            <span className="text-lg font-semibold">Campaigns</span>
            <span className="text-sm text-muted-foreground">
              Here are the basic information of shop
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4">
          <DataTable
            filterBy={"name"}
            data={shop?.data.campaigns ?? []}
            columns={CampaignColumns}
          />
        </div>
      </div>
    </section>
  );
};

export { ShopInfoCampaigns };
