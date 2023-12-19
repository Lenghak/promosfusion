"use client";

import { useState } from "react";

import { MemberColumns } from "@/components/modules/member";
import ShopAssignForm from "@/components/modules/shop/shop-info-view/shop-info-members/shop-assign-member-form";
import ShopDismissMember from "@/components/modules/shop/shop-info-view/shop-info-members/shop-dismiss-member";
import { DataTable } from "@/components/ui/data-table";

import { usePermission } from "@/hooks/member/use-permission";

import useGetShopService from "@/services/shops/query/use-get-shop-service";

import { isAxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

import { type Member } from "@/types/member";

const ShopInfoMembers = ({ shopId }: { shopId: string }) => {
  const { data: shop, isError, isLoading, error } = useGetShopService(shopId);

  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  const permission = usePermission();

  const { data: session } = useSession();

  return (
    <section className="relative flex h-full w-full flex-col gap-4">
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
          {shop?.data && (
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
                selectedMembers.length &&
                session &&
                permission(session.user.role, session.user.uuid, "u") ? (
                  <ShopDismissMember
                    shopId={shopId}
                    selectedMember={selectedMembers}
                  />
                ) : null
              }
              onRowSelectChange={setSelectedMembers}
            />
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-background">
          <Loader2
            size={24}
            className="animate-spin"
          />
          <span>Loading Shop...</span>
        </div>
      ) : null}

      {isError ? (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-background">
          {isAxiosError(error) && error?.response?.status === 404 ? (
            <span className={"text-center"}>Shop Not Found</span>
          ) : (
            <span className={"text-center"}>
              There was a problem getting shop data. Please try again later.
            </span>
          )}
        </div>
      ) : null}
    </section>
  );
};

export { ShopInfoMembers as default };
