"use client";

import { MemberDeleteForm } from "@/components/modules/member/member-delete-form";

import { usePermission } from "@/hooks/member/use-permission";

import { Member } from "@/types/member";

const MemberInfoDelete = ({ member }: { member: Member }) => {
  const permission = usePermission();

  return permission(member) ? (
    <div className="flex h-full w-full flex-col items-start justify-center gap-6 border-t py-4 lg:flex-row lg:items-center">
      <div className="flex w-full justify-between gap-2">
        <div className="flex w-full flex-col gap-1">
          <span className="text-lg font-semibold">Delete Account</span>
          <span className="text-sm text-muted-foreground">
            Delete and remove this user data from our server
          </span>
        </div>
      </div>

      {member?.id && <MemberDeleteForm memberId={`${member.id}`} />}
    </div>
  ) : null;
};

export { MemberInfoDelete };
