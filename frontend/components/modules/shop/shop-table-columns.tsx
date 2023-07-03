"use client";

import { Fragment, useState } from "react";

import Link from "next/link";

import { ShopUpdateForm } from "@/components/modules/shop/shop-update-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { dateFormat } from "@/lib/utils";
import { useDialogStore } from "@/lib/zustand";

import { useDeleteShopService } from "@/services/shop";

import { useHandleDeleteEffect } from "@/hooks/shop/use-handle-effect";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";

import { Shop } from "@/types/shop";

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
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="h-full w-full px-4">
        {dateFormat(row.original.created_at)}
      </div>
    ),
  },

  {
    id: "actions",
    cell: function Cell({ row }) {
      const { openDialog } = useDialogStore();

      const [deleteAlertOpen, openDeleteAlert] = useState<boolean>(false);

      const { data: session } = useSession();

      const {
        mutate: deleteShop,
        isLoading: isDeleting,
        isError: isDeletedError,
        isSuccess: isDeleted,
      } = useDeleteShopService();

      const UPDATE_ALERT_DIALOG_ID = `shop-update-dialog-${row.original.id}`;

      useHandleDeleteEffect(isDeletedError, isDeleted, isDeleting);

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
              <DropdownMenuItem>
                <Link href={`/shops/${row.original.id}`}>View Shop</Link>
              </DropdownMenuItem>

              {session?.user.role ? (
                <DropdownMenuItem
                  onClick={() => openDialog(true, UPDATE_ALERT_DIALOG_ID)}
                >
                  Update Shop
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem disabled={true}>Update Shop</DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              {session?.user.role === "root" ? (
                <DropdownMenuItem
                  className="font-medium text-destructive"
                  onClick={() => openDeleteAlert(true)}
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

          {session?.user.role === "root" ? (
            <Fragment>
              <ShopUpdateForm
                dialogID={UPDATE_ALERT_DIALOG_ID}
                shop={row.original}
              />
              <AlertDialog open={deleteAlertOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the shop including its campaigns and coupons, and remove
                      the data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => openDeleteAlert(false)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        className={
                          "bg-destructive text-destructive-foreground hover:bg-destructive/80"
                        }
                        variant={"destructive"}
                        onClick={() => {
                          deleteShop(`${row.original.id}`);
                          openDeleteAlert(false);
                        }}
                      >
                        Delete
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Fragment>
          ) : null}
        </Fragment>
      );
    },
  },
];

export { ShopColumns };
