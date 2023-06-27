import Link from "next/link";

import { PageTitle } from "@/components/modules/page-title";
import { CampaignDetailsCard } from "@/components/modules/campaign";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Filter, Plus, Search } from "lucide-react";

type CampaignDetailsProps = {};

export default function CampaignDetails({}: CampaignDetailsProps) {
  return (
    <div className="flex flex-col">
      <div>
        <PageTitle
          title="Campaign Detail"
          description="Views the details and lists of your coupons"
        />
      </div>
      <div>
        <CampaignDetailsCard />
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
    </div>
  );
}
