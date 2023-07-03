import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Edit } from "lucide-react";

import { Member } from "@/types/member";

type MemberProfileProps = {
  member: Member;
  isQueryingMember: boolean;
};

const MemberProfile = ({ member, isQueryingMember }: MemberProfileProps) => {
  return (
    <div className="flex h-fit w-full flex-col gap-1 border-t py-4 lg:flex-row">
      <div className="flex w-full flex-col gap-2">
        <span className="font-semibold">Profile Picture</span>
        <span className="text-sm capitalize text-muted-foreground">
          {member?.name}&apos;s Profile Picture
        </span>
      </div>
      {!isQueryingMember ? (
        <div className="relative flex w-full items-center gap-4 py-2">
          <div className="flex items-center gap-4">
            <Avatar className="relative h-16 w-16">
              <AvatarImage
                src={member?.avatar}
                alt={`@${member?.name}`}
              />
              <AvatarFallback className="font-semibold uppercase">
                {member?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-center">
              <span className="font-semibold">{member?.name}</span>
              <span className="text-sm text-muted-foreground">
                {member?.email}
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
  );
};

export { MemberProfile };
