"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ShopInfoBasic } from "./shop-info-basic";
import { ShopInfoCampaigns } from "./shop-info-campaigns";
import { ShopInfoMembers } from "./shop-info-members";

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
          <ShopInfoBasic shopId={shopId} />
        </TabsContent>
        <TabsContent
          value="campaigns"
          className="max-h-[72.5vh] overflow-y-auto focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <ShopInfoCampaigns />
        </TabsContent>
        <TabsContent
          value="members"
          className="max-h-[72.5vh] overflow-y-auto focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <ShopInfoMembers />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { ShopInfoView };
