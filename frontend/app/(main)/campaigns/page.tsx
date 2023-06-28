import Link from "next/link";

import { CampaignTable, CampaignTitle } from "@/components/modules/campaign";
import {
  Campaign,
  columns,
} from "@/components/modules/campaign/campaign-table-columns";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCampaigns } from "@/lib/axios/campaign";
import { getQueryClient } from "@/lib/react-query";

import { dehydrate, Hydrate, useQueryClient } from "@tanstack/react-query";
import { Filter, Plus, Search } from "lucide-react";

export default async function Campaigns() {

  await getQueryClient().prefetchQuery(["campaigns"], () => getCampaigns());
  const dehydratedState = dehydrate(getQueryClient());

  return (
    <div className="flex flex-col">
      <div>
        <CampaignTitle />
      </div>
      <div className="flex flex-row items-center justify-between px-4 py-6 font-bold">
        <div className="flex flex-row items-center gap-2">
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Compaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-campaign">All Campaign</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Created Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created-date">Created Date</SelectItem>
                <SelectItem value="valid-date">Valid Date</SelectItem>
                <SelectItem value="expire-date">Expire Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button variant="outline">
              <Filter />
            </Button>
          </div>
          <div>
            <Button variant="outline">
              <Search />
            </Button>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div>
            <div className="text-neutral-400">Showing&nbsp;</div>{" "}
          </div>
          <div>
            <Button variant="default">
              <Link
                className="flex flex-row items-center gap-2 "
                href={"/campaigns/add"}
              >
                <Plus />
                <span>Add Campaign</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Hydrate state={dehydratedState}>
          <CampaignTable />
        </Hydrate>
      </div>
    </div>
  );
}
