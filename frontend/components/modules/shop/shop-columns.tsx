"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Shop } from "@/types/shop";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const ShopCoulmns: ColumnDef<Shop>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
