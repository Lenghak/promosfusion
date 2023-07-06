"use client";

import { useState } from "react";

import { MemberColumns } from "@/components/modules/member";
import { ShopAssignForm } from "@/components/modules/shop/shop-info-view/shop-info-members/shop-assign-member-form";
import { ShopDismissMember } from "@/components/modules/shop/shop-info-view/shop-info-members/shop-dismiss-member";
import { DataTable } from "@/components/ui/data-table";

import { useGetShopService } from "@/services/shop";

import { Member } from "@/types/member";

const ShopInfoMembers = ({ shopId }: { shopId: string }) => {
  const { data: shop } = useGetShopService(shopId);

  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  return (
    <section className="flex h-full w-full flex-col gap-4">
      <div className="flex h-full w-full flex-col items-start justify-center gap-2 px-4 py-2">
        <div className="flex w-full justify-between gap-2">
          <div className="flex w-full flex-col gap-1">
            <span className="text-lg font-semibold">Assigned Members</span>
            <span className="text-sm text-muted-foreground">
              Here are the list of assigned members
            </span>
          </div>
        </div>

        <div className="flex h-full w-full flex-col gap-4">
          <DataTable
            filterBy={"name"}
            data={shop?.data.users ?? []}
            columns={MemberColumns}
            tableContainerClass="h-[42vh] overflow-y-auto"
            widget={
              <ShopAssignForm
                shopId={parseInt(shopId)}
                dialogID={`shop-assign-form-${shopId}`}
              />
            }
            footerWidget={
              selectedMembers.length ? (
                <ShopDismissMember
                  shopId={shopId}
                  selectedMember={selectedMembers}
                />
              ) : null
            }
            onRowSelectChange={(selected) => setSelectedMembers(selected)}
          />
        </div>
      </div>
    </section>
  );
};

export { ShopInfoMembers };
