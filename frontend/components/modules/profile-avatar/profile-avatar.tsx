"use client";

import { forwardRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

import { AvatarProps } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";

const ProfileAvatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, ...props }, ref) => {
    const { data: session } = useSession();

    console.log(session);

    return (
      <Avatar
        className={cn("cursor-pointer", className)}
        ref={ref}
        {...props}
      >
        {session?.user.avatar && <AvatarImage src={session?.user.avatar} />}
        <AvatarFallback className="font-medium uppercase">
          {session?.user.name?.charAt(0)}
        </AvatarFallback>
      </Avatar>
    );
  }
);

export { ProfileAvatar };
