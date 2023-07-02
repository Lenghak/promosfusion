"use client";

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { dateFormat } from "@/lib/utils";
import { useDialogStore } from "@/lib/zustand";

import { useDeleteMemberService } from "@/services/member";

import { useHandleDeleteEffect } from "@/hooks/member/use-handle-effect";
import { usePermission } from "@/hooks/member/use-permission";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { AvatarCard } from "../avatar-card";
import { MemberUpdateForm } from "./member-update-form";

import { Member } from "@/types/member";

const MemberColumns: ColumnDef<Member>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    id: "ID",
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <AvatarCard
        name={row.original.name}
        image={row.original.avatar}
        info={row.original.email}
      />
    ),
    enableHiding: false,
  },
  {
    id: "Phone Number",
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="h-full w-full px-4">{row.original.phone}</div>
    ),
  },
  {
    id: "Role",
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="h-full w-full px-4">{row.original.role}</div>
    ),
  },
  {
    id: "Status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <>
        {row.getValue("Status") === "active" ? (
          <Badge className="bg-green-600 hover:bg-green-500 dark:bg-green-950 dark:text-success dark:hover:bg-green-900">
            Active
          </Badge>
        ) : null}
      </>
    ),
  },

  {
    id: "Created At",
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
        {dateFormat(row.original.createdAt)}
      </div>
    ),
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const { openDialog } = useDialogStore();

      const {
        mutate: deleteMember,
        isLoading: isDeletingMember,
        isError: isMemberDeleteError,
        isSuccess: isMemberDeleted,
      } = useDeleteMemberService();

      const permission = usePermission();

      useHandleDeleteEffect(isMemberDeleteError, isMemberDeleted);

      return (
        <>
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
                onClick={() =>
                  navigator.clipboard.writeText(row.original.email)
                }
              >
                Copy Email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {permission(row.original) && (
                <DropdownMenuItem>Assigns Shop</DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Link href={`/members/${row.original.id}`}>View Member</Link>
              </DropdownMenuItem>
              {permission(row.original) ? (
                <DropdownMenuItem
                  onClick={() =>
                    openDialog(true, `member-update-dialog-${row.original.id}`)
                  }
                >
                  Update Member
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem disabled>Update Member</DropdownMenuItem>
              )}
              <DropdownMenuSeparator />

              {permission(row.original) ? (
                <DropdownMenuItem className="font-medium text-destructive">
                  <AlertDialog>
                    <AlertDialogTrigger disabled={isDeletingMember}>
                      Delete Member
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the account and remove the data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMember(`${row.original.id}`)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="font-medium text-destructive"
                  disabled
                >
                  Delete Member
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          {permission(row.original) && (
            <>
              <MemberUpdateForm
                member={row.original}
                dialogID={`member-update-dialog-${row.original.id}`}
              />
            </>
          )}
        </>
      );
    },
  },
];

export { MemberColumns };
