"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetMemberService } from "@/services/member";

import { Edit } from "lucide-react";

import { MemberUpdateForm } from "../member-update-form";
import { MemberError } from "./member-error";
import MemberInfo from "./member-info";

type MemberInfoViewProps = {
  id: string;
};

const MemberInfoView = ({ id }: MemberInfoViewProps) => {
  const {
    data: member,
    isLoading: isQueringMember,
    isError: isQueringError,
  } = useGetMemberService(id);

  return !isQueringError ? (
    <section className="flex h-full w-full flex-col gap-4 ">
      {/* Profile Picture + Name + Email */}
      <div className="flex h-fit w-full gap-1 border-t py-4">
        <div className="flex w-full flex-col gap-2">
          <span className="text-lg font-semibold">Profile Picture</span>
          <span className="text-sm capitalize text-muted-foreground">
            {member?.data.name}&apos;s Profile Picture
          </span>
        </div>
        {!isQueringMember ? (
          <div className="relative flex w-full items-center gap-4 py-2">
            <div className="flex items-center gap-4">
              <Avatar className="relative h-16 w-16">
                <AvatarImage
                  src={member?.data.avatar}
                  alt={`@${member?.data.name}`}
                />
                <AvatarFallback className="text-lg font-semibold uppercase">
                  {member?.data.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col justify-center">
                <span className="text-lg font-semibold">
                  {member?.data.name}
                </span>
                <span className="text-muted-foreground">
                  {member?.data.email}
                </span>
              </div>
            </div>
            <Button className="absolute bottom-0 left-0  h-fit w-fit rounded-full p-2">
              <Edit size={18} />
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="16[w-160px] h-4" />
            </div>
          </div>
        )}
      </div>

      {/* Infomation in the of cards in sequence  */}
      <MemberInfo member={member?.data} />

      {member?.data.role === "root" && (
        <MemberUpdateForm
          member={member?.data!!}
          dialogID={`member-update-dialog-${member?.data.id}`}
        />
      )}
    </section>
  ) : (
    <MemberError />
  );
};

export { MemberInfoView };
