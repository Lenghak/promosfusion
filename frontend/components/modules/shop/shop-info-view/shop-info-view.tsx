"use client";

import { ShopInfoBasic } from "@/components/modules/shop/shop-info-view/shop-info-basic";
import { ShopInfoCampaigns } from "@/components/modules/shop/shop-info-view/shop-info-campaigns";
import { ShopInfoMembers } from "@/components/modules/shop/shop-info-view/shop-info-members";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ShopInfoViewProps = {
  shopId: string;
};

const ShopInfoView = ({ shopId }: ShopInfoViewProps) => {
  return (
    <div className={"h-full w-full"}>
      <Tabs
        defaultValue="info"
        className="w-full bg-background"
      >
        <TabsList className="w-full justify-start gap-4 rounded-[0] border-b bg-background p-0">
          <TabsTrigger
            value="info"
            className="h-full rounded-[0] border-b-2 border-transparent text-base data-[state=active]:border-secondary data-[state=active]:shadow-none"
          >
            Info
          </TabsTrigger>
          <TabsTrigger
            value="campaigns"
            className="h-full rounded-[0] border-b-2 border-transparent text-base data-[state=active]:border-secondary data-[state=active]:shadow-none"
          >
            Campaigns
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="h-full rounded-[0] border-b-2 border-transparent text-base data-[state=active]:border-secondary data-[state=active]:shadow-none"
          >
            Members
          </TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <ShopInfoBasic shopId={shopId} />
        </TabsContent>
        <TabsContent value="campaigns">
          <ShopInfoCampaigns />
        </TabsContent>
        <TabsContent value="members">
          <ShopInfoMembers />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { ShopInfoView };
