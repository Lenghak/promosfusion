"use client";

import { Badge } from "@/components/ui/badge";

import { ColumnDef } from "@tanstack/react-table";

export type Coupon = {
  id: number;
  cauid: string;
  createdCoupon: number;
  createdAt: string;
  verifiedDate: string;
//   startAt: string;
//   endAt: string;
  status: string;
};

export const columns: ColumnDef<Coupon>[] = [
  {
    accessorKey: "id",
    header: "No",
  },
  {
    accessorKey: "cauid",
    header: "CID",
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
    accessorKey: "createdAt",
    header: "Created Date",
  },
  {
    accessorKey: "verifiedDate",
    header: "Verified Date",
  },
//   {
//     accessorKey: "startAt",
//     header: "Valid From",
//   },
//   {
//     accessorKey: "endAt",
//     header: "Expires Date",
//   },
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
