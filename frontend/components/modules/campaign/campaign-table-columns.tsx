"use client";

import Link from "next/link";

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

import { Campaign } from "@/types/campaign";

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
    accessorKey: "maxCreatableCoupon",
    header: "Coupons",
    cell: ({ row }) => {
      const { maxCreatableCoupon, creatableCoupon } = row.original;
      const createdCoupon = maxCreatableCoupon - creatableCoupon;
      return (
        <span>
          {createdCoupon} / {maxCreatableCoupon}
        </span>
      );
    },
  },
  {
    accessorKey: "couponType",
    header: "Type",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const formattedDate = new Date(createdAt).toLocaleDateString("en-GB");
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "startAt",
    header: "Valid From",
    cell: ({ row }) => {
      const { startAt } = row.original;
      const formattedDate = new Date(startAt).toLocaleDateString("en-GB");
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "endAt",
    header: "Expires Date",
    cell: ({ row }) => {
      const { endAt } = row.original;
      const formattedDate = new Date(endAt).toLocaleDateString("en-GB");
      return <span>{formattedDate}</span>;
    },
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
            {/* Create Coupon Handle Here */}
            <DropdownMenuItem>Create Coupon</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/campaigns/${campaign.id}`}>
                View Campaign Details
              </Link>
            </DropdownMenuItem>
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
