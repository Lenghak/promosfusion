"use client";

import * as React from "react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Edit, Filter, MoreVertical, Plus, Search } from "lucide-react";

type CampaignsProps = {
  campaignCount: number;
};

export default function Campaigns({ campaignCount }: CampaignsProps) {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between py-6 font-bold">
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
            <div>{campaignCount}</div>
          </div>
          <div>
            <Button variant="default">
              <Link
                className="flex flex-row gap-2"
                href={"/campaigns/add"}
              >
                <Plus />
                <span>Add Campaign</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Table>
          <TableCaption>A list of all of your Campaigns.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">No</TableHead>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Description</TableHead>
              <TableHead className="font-bold">Coupons</TableHead>
              <TableHead className="font-bold">Created At</TableHead>
              <TableHead className="font-bold">Valide From</TableHead>
              <TableHead className="font-bold">Expire At</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-center font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">1</TableCell>
              <TableCell className="font-bold">Lorem</TableCell>
              <TableCell className="font-bold">Lorem</TableCell>
              <TableCell className="font-bold">6/16</TableCell>
              <TableCell className="font-bold">01-May-2023</TableCell>
              <TableCell className="font-bold">02-May-2023</TableCell>
              <TableCell className="font-bold">02-May-2023</TableCell>
              <TableCell className="font-bold">
                <Badge variant="outline">Available</Badge>
              </TableCell>
              <TableCell className="flex flex-row justify-center gap-1">
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    <Edit size={20} />
                  </Button>
                </div>
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    <MoreVertical size={20} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
