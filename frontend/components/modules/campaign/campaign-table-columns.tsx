"use client";

import { Fragment } from "react";

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

import { useHandleDeleteEffect } from "@/hooks/campaign/use-handle-effect";

import { useDialogStore } from "@/lib/zustand";

import useDeleteCampaignService from "@/services/campaigns/query/use-delete-campaign-service";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";

import { CampaignDeleteForm } from "./campaign-delete-form";
import { CampaignUpdateForm } from "./campaign-update-form";

import { type Campaign } from "@/types/campaign";

const columns: ColumnDef<Campaign>[] = [
  {
    id: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-fit"
        >
          No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="h-full w-full px-4">{row.index + 1}</div>
    ),
    enableHiding: false,
    enableSorting: true,
  },
  // {
  //   accessorKey: "id",
  //   header: "ID",
  // },
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
      <Badge className={`${getStatusBadgeColor(row.original.status)}`}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const campaign = row.original;

      const { openDialog } = useDialogStore();

      const { data: session } = useSession();

      const { isError: isDeletedError, isSuccess: isDeleted } =
        useDeleteCampaignService();

      const UPDATE_ALERT_DIALOG_ID = `campaign-update-dialog-${row.original.id}`;
      const CAMPAIGN_DELETE_DIALOG_ID = `campaign-delete-dialog-${row.original.id}`;

      useHandleDeleteEffect(isDeletedError, isDeleted);

      return (
        <Fragment>
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
              <DropdownMenuItem>
                <Link href={`/campaigns/${campaign.id}`}>
                  View Campaign Details
                </Link>
              </DropdownMenuItem>

              {session?.user.role !== "seller" ? (
                <DropdownMenuItem
                  onClick={() => openDialog(true, UPDATE_ALERT_DIALOG_ID)}
                >
                  Update Campaign
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem disabled>Update Campaign</DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              {session?.user.role === "root" ? (
                <DropdownMenuItem
                  className="font-medium text-destructive"
                  onClick={() => {
                    openDialog(true, CAMPAIGN_DELETE_DIALOG_ID);
                  }}
                >
                  Delete Campaign
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="font-medium text-destructive"
                  disabled
                >
                  Delete Campaign
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {session?.user.role !== "seller" ? (
            <Fragment>
              <CampaignUpdateForm
                dialogID={UPDATE_ALERT_DIALOG_ID}
                campaign={row.original}
              />
              <CampaignDeleteForm
                campaignId={`${row.original.id}`}
                manual
              />
            </Fragment>
          ) : null}
        </Fragment>
      );
    },
  },
];

const getStatusBadgeColor = (status: string) => {
  // Customize badge color based on the status value
  if (status === "new") {
    return "bg-primary hover:bg-primary/80";
  } else if (status === "valid") {
    return "bg-green-500 hover:bg-green-500/80";
  } else if (status === "verified") {
    return "bg-yellow-500 hover:bg-yellow-500/80";
  } else {
    return "bg-red-500 hover:bg-red-500/80";
  }
};

export { columns as default };
