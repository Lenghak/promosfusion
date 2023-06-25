"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type Campaign = {
  id: number;
  cauid: string;
  name: string;
  description: string;
  createdCoupon: number;
  creatableCoupon: number;
  type: string;
  createdAt: string;
  startAt: string;
  endAt: string;
  status: string;
};

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "id",
    header: "No",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "creatableCoupon",
    header: "Coupons",
    cell: ({ row }) => {
      const { createdCoupon, creatableCoupon } = row.original;
      return (
        <span>
          {createdCoupon} / {creatableCoupon}
        </span>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
  },
  {
    accessorKey: "startAt",
    header: "Valid From",
  },
  {
    accessorKey: "endAt",
    header: "Expires Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge color={getStatusBadgeColor(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const campaign = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(campaign.cauid)}
            >
              Copy Campaign ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Create Coupon</DropdownMenuItem>
            <DropdownMenuItem>View Campaign Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const getStatusBadgeColor = (status: string) => {
  // Customize badge color based on the status value
  if (status === "Active") {
    return "green";
  } else if (status === "Inactive") {
    return "gray";
  } else if (status === "Pending") {
    return "yellow";
  } else {
    return "default";
  }
};
