"use client";

import { Badge } from "@/components/ui/badge";

import { ColumnDef } from "@tanstack/react-table";

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
    accessorKey: "id",
    header: "No",
  },
  {
    accessorKey: "cuid",
    header: "CID",
  },
  {
    accessorKey: "currentStatus",
    header: "Status",
    cell: ({ row }) => (
      <Badge color={getStatusBadgeColor(row.original.currentStatus)}>
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
