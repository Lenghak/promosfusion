import { CampaignTable, CampaignTitle } from "@/components/modules/campaign";
import { CampaignDialogCreationForm } from "@/components/modules/campaign";
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
import { Filter, Search } from "lucide-react";

export default async function Campaigns() {
  await getQueryClient().prefetchQuery(["campaigns"], () => getCampaigns());
  const dehydratedState = dehydrate(getQueryClient());

  return (
    <div className="flex flex-col">
      <div className="px-4">
        <CampaignTitle />
      </div>
      <div>
        <Hydrate state={dehydratedState}>
          <CampaignTable />
        </Hydrate>
      </div>
    </div>
  );
}
