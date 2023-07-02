"use client";

import { Fragment } from "react";

import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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
                <Link href={`/members/${row.original.id}`}>View Member</Link>
              </DropdownMenuItem>
              (
              <DropdownMenuItem
                onClick={() =>
                  openDialog(true, `member-update-dialog-${row.original.id}`)
                }
              >
                Update Shop
              </DropdownMenuItem>
              )
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-medium text-destructive">
                <AlertDialog>
                  <AlertDialogTrigger className={"text-destructive"}>
                    Delete Shop
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the shop including its campaigns and coupons, and
                        remove the data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="font-medium text-destructive"
                disabled
              >
                Delete Shop
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Fragment>
      );
    },
  },
];

export { ShopColumns };
