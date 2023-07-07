"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useGetShopService } from "@/services/shop";

import { isAxiosError } from "axios";
import { Loader2 } from "lucide-react";

import { ShopError } from "./shop-error";
import { ShopInfoBasic } from "./shop-info-basic";
import { ShopInfoCampaigns } from "./shop-info-campaigns";
import { ShopInfoMembers } from "./shop-info-members";

type ShopInfoViewProps = {
  shopId: string;
};

const ShopInfoView = ({ shopId }: ShopInfoViewProps) => {
  const { data: shop, isLoading, isError, error } = useGetShopService(shopId);

  return (
    <div className={"relative h-full w-full"}>
      {!isError && (
        <Tabs
          defaultValue="info"
          className="w-full bg-background"
        >
          <TabsList className="w-full justify-start gap-4 rounded-[0px] border-b bg-background px-2 py-0">
            <TabsTrigger
              value="info"
              className="-mb-0.5 h-full rounded-[0px] border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:shadow-none"
            >
              Info
            </TabsTrigger>
            <TabsTrigger
              value="campaigns"
              className="-mb-0.5 h-full rounded-[0px] border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:shadow-none"
            >
              Campaigns
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="-mb-0.5 h-full rounded-[0px] border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:shadow-none"
            >
              Members
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="info"
            className="max-h-[72.5vh] overflow-y-auto focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <ShopInfoBasic shop={shop?.data} />
          </TabsContent>
          <TabsContent
            value="campaigns"
            className="max-h-[72.5vh] overflow-y-auto focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <ShopInfoCampaigns shop={shop?.data} />
          </TabsContent>
          <TabsContent
            value="members"
            className="max-h-[72.5vh] overflow-y-auto focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <ShopInfoMembers shopId={shopId} />
          </TabsContent>
        </Tabs>
      )}

      {isLoading ? (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-background">
          <Loader2
            size={24}
            className="animate-spin"
          />
          <span>Loading Shop...</span>
        </div>
      ) : null}

      {isError ? (
        <ShopError
          status={isAxiosError(error) ? `${error.response?.status}` : "400"}
        />
      ) : null}
    </div>
  );
};

export { ShopInfoView };
