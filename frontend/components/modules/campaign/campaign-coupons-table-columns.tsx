"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Coupon = {
  id: number;
  cuid: string;
  createdAt: string;
  currentStatus: string;
  // verifiedDate: string;
  // verifiedBy: string;
  //   startAt: string;
  //   endAt: string;
};

export const columns: ColumnDef<Coupon>[] = [
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
    accessorKey: "cuid",
    header: "CID",
  },
  {
    accessorKey: "currentStatus",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={`${getStatusBadgeColor(row.original.currentStatus)}`}>
        {row.original.currentStatus}
      </Badge>
    ),
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
  // {
  //   accessorKey: "verifiedDate",
  //   header: "Verified Date",
  //   cell: ({ row }) => {
  //     const { verifiedDate } = row.original;
  //     const formattedDate = new Date(verifiedDate).toLocaleDateString("en-GB");
  //     return <span>{formattedDate}</span>;
  //   },
  // },
  // {
  //   accessorKey: "verifiedBy",
  //   header: "Verified By",
  // },
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
