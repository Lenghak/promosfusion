"use client";

import { Fragment } from "react";

import Link from "next/link";

import { ShopUpdateForm } from "@/components/modules/shop/shop-update-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useHandleDeleteEffect } from "@/hooks/shop/use-handle-effect";

import { dateFormat } from "@/lib/utils";
import { useDialogStore } from "@/lib/zustand";

import useDeleteShopService from "@/services/shops/query/use-delete-shop-service";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";

import { ShopDeleteForm } from "./shop-delete-form";

import { type Shop } from "@/types/shop";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const ShopColumns: ColumnDef<Shop>[] = [
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
  {
    accessorKey: "logo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-fit"
        >
          Logo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="h-full w-full px-4">
        <Avatar className="relative h-12 w-12 rounded-sm object-cover">
          <AvatarImage
            src={row.original.logo}
            alt={`@${row.getValue<string>("name")}`}
          />
          <AvatarFallback className="text-lg font-semibold uppercase">
            {row.getValue<string>("name").charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
    ),
    enableHiding: false,
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-fit"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="h-full w-full px-4">{row.getValue<string>("name")}</div>
    ),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-fit"
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="h-full w-full px-4">{row.getValue("description")}</div>
    ),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={"w-max whitespace-nowrap"}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="h-full w-max whitespace-nowrap px-4">
        {dateFormat(row.original.createdAt)}
      </div>
    ),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className={"w-max whitespace-nowrap"}
        >
          Updated At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="h-full w-max whitespace-nowrap px-4">
        {dateFormat(row.original.updatedAt)}
      </div>
    ),
    enableHiding: true,
    enableSorting: true,
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const { openDialog } = useDialogStore();

      const { data: session } = useSession();

      const { isError: isDeletedError, isSuccess: isDeleted } =
        useDeleteShopService();

      const UPDATE_ALERT_DIALOG_ID = `shop-update-dialog-${row.original.id}`;
      const SHOP_DELETE_DIALOG_ID = `shop-delete-dialog-${row.original.id}`;

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
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(row.original.logo)}
              >
                Copy Image URL
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={`/shops/${row.original.id}`}
                  className={"h-full w-full"}
                >
                  View Shop
                </Link>
              </DropdownMenuItem>

              {session?.user.role !== "seller" ? (
                <DropdownMenuItem
                  onClick={() => openDialog(true, UPDATE_ALERT_DIALOG_ID)}
                >
                  Update Shop
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem disabled>Update Shop</DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              {session?.user.role === "root" ? (
                <DropdownMenuItem
                  className="font-medium text-destructive"
                  onClick={() => {
                    openDialog(true, SHOP_DELETE_DIALOG_ID);
                  }}
                >
                  Delete Shop
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="font-medium text-destructive"
                  disabled
                >
                  Delete Shop
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {session?.user.role !== "seller" ? (
            <Fragment>
              <ShopUpdateForm
                dialogID={UPDATE_ALERT_DIALOG_ID}
                shop={row.original}
              />
              <ShopDeleteForm
                shopId={`${row.original.id}`}
                manual
              />
            </Fragment>
          ) : null}
        </Fragment>
      );
    },
  },
];

export { ShopColumns };
