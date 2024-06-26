"use client";

import { Fragment } from "react";

import Link from "next/link";

import { MemberAssignForm } from "@/components/modules/member/member-assign-form";
import { MemberDeleteForm } from "@/components/modules/member/member-delete-form";
import { MemberUpdateForm } from "@/components/modules/member/member-update-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { Checkbox } from "@/components/ui/checkbox";
import { dateFormat } from "@/lib/utils";
import { useDialogStore } from "@/lib/zustand";

import { useDeleteMemberService } from "@/services/member";

import { useHandleDeleteEffect } from "@/hooks/member/use-handle-effect";
import { usePermission } from "@/hooks/member/use-permission";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";

import { AvatarCard } from "../avatar-card";

import { type Member } from "@/types/member";

const MemberColumns: ColumnDef<Member>[] = [
  {
    id: "select",
    header: function Header({ table }) {
      const { data: session } = useSession();
      return session?.user.role !== "seller" ? (
        <Checkbox
          id={"checkbox"}
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ) : null;
    },
    cell: function Cell({ row }) {
      const { data: session } = useSession();

      return session?.user.role !== "seller" ? (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ) : null;
    },
    enableSorting: false,
    enableHiding: false,
  },

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
    id: "Shop",
    accessorKey: "shopIds",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Shop ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="h-full w-full px-4">{row.original.shopIds[0]}</div>
    ),
    enableHiding: true,
    enableSorting: true,
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
    id: "Updated At",
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
    cell: function Cell(cell) {
      const { openDialog } = useDialogStore();

      const { isError: isMemberDeleteError, isSuccess: isMemberDeleted } =
        useDeleteMemberService();

      const permission = usePermission();

      useHandleDeleteEffect(isMemberDeleteError, isMemberDeleted);

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
                onClick={() =>
                  navigator.clipboard.writeText(cell.row.original.email)
                }
              >
                Copy Email
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              {/* Assigning Member */}
              {permission(
                cell.row.original.role,
                cell.row.original.uuid,
                "d"
              ) ? (
                <DropdownMenuItem
                  onClick={() =>
                    openDialog(
                      true,
                      `member-assign-dialog-${cell.row.original.id}`
                    )
                  }
                >
                  Assign to
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem disabled>Assign Member</DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link
                  href={`/members/${cell.row.original.id}`}
                  className={"h-full w-full"}
                >
                  View Member
                </Link>
              </DropdownMenuItem>
              {permission(
                cell.row.original.role,
                cell.row.original.uuid,
                "u"
              ) ? (
                <DropdownMenuItem
                  onClick={() =>
                    openDialog(
                      true,
                      `member-update-dialog-${cell.row.original.id}`
                    )
                  }
                >
                  Update Member
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem disabled>Update Member</DropdownMenuItem>
              )}
              <DropdownMenuSeparator />

              {/* Delete Member */}
              {permission(
                cell.row.original.role,
                cell.row.original.uuid,
                "d"
              ) ? (
                <DropdownMenuItem
                  className="font-medium text-destructive"
                  onClick={() =>
                    openDialog(
                      true,
                      `member-delete-dialog-${cell.row.original.id}`
                    )
                  }
                >
                  Delete Member
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
          {permission(cell.row.original.role, cell.row.original.uuid, "u") && (
            <Fragment>
              <MemberUpdateForm
                member={cell.row.original }
                dialogID={`member-update-dialog-${cell.row.original.id}`}
              />
              <MemberDeleteForm
                memberId={`${cell.row.original.id}`}
                manual
              />

              <MemberAssignForm
                member={cell.row.original}
                dialogID={`member-assign-dialog-${cell.row.original.id}`}
              />
            </Fragment>
          )}
        </Fragment>
      );
    },
  },
];

export { MemberColumns };
