"use client";

import { MemberInfoDelete } from "@/components/modules/member/member-info-view/member-info-delete";

import { useGetMemberService } from "@/services/member";

import { Loader2 } from "lucide-react";

import { MemberError } from "./member-error";
import MemberInfo from "./member-info";
import { MemberProfile } from "./member-profile";

type MemberInfoViewProps = {
  id: string;
};

const MemberInfoView = ({ id }: MemberInfoViewProps) => {
  const {
    data: member,
    isLoading: isQueryingMember,
    isError: isQueryingError,
  } = useGetMemberService(id);

  return !isQueryingError && member?.data ? (
    <section className="flex h-full w-full flex-col gap-4 ">
      {/* Profile Picture + Name + Email */}
      <MemberProfile
        member={member.data!!}
        isQueryingMember={isQueryingMember}
      />

      {/* Information in the of cards in sequence  */}
      <MemberInfo member={member.data!!} />

      {/* Delete user section */}
      <MemberInfoDelete member={member.data!!} />
    </section>
  ) : isQueryingError ? (
    <MemberError />
  ) : (
    <div className="flex h-full w-full flex-col place-content-center place-items-center gap-4">
      <Loader2
        size={24}
        className={"animate-spin"}
      />
      <span>Getting Member Data...</span>
    </div>
  );
};

export { MemberInfoView };
