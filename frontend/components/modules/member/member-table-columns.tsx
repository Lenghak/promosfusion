"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// import { Checkbox } from "@/components/ui/checkbox";
import { dateFormat } from "@/lib/utils";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { AvatarCard } from "../avatar-card";

// import { MemberTableActionCell } from "./member-table-actions/member-table-actions";
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
    // cell: (args) => <MemberTableActionCell {...args} />,
  },
];

export { MemberColumns };
