import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useDialogStore } from "@/lib/zustand";

import { Edit, Mail, Phone, UserCog } from "lucide-react";
import { User } from "lucide-react";

import { Member } from "@/types/member";

type MemberInfoProps = { member?: Member };

export default function MemberInfo({ member }: MemberInfoProps) {
  const openDialog = useDialogStore((state) => state.openDialog);
  return (
    <div className="flex h-full w-full flex-col items-start justify-center gap-6 border-t py-4 lg:flex-row">
      <div className="flex w-full justify-between gap-2">
        <div className="flex w-full flex-col gap-1">
          <span className="text-lg font-semibold">User Information</span>
          <span className="text-sm text-muted-foreground">
            Here are the basic information of {member?.name}
          </span>
        </div>
        <Button
          variant={"ghost"}
          className="h-fit w-fit p-3"
          onClick={() => openDialog(true, `member-update-dialog-${member?.id}`)}
        >
          <Edit size={18} />
        </Button>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="relative flex w-full flex-col gap-2">
          <Label className="text-sm text-muted-foreground">Name</Label>
          <span className="relative min-h-[2.5rem] rounded-lg border px-3 py-2 text-sm">
            {member?.name}
            <User
              className="absolute bottom-0 right-4 top-0 h-full place-self-center self-center"
              size={18}
            />
          </span>
        </div>
        <div className="relative flex w-full flex-col gap-2">
          <Label className="text-sm text-muted-foreground">Role</Label>
          <span className="relative min-h-[2.5rem] rounded-lg border px-3 py-2 text-sm">
            {member?.role}
            <UserCog
              className="absolute bottom-0 right-4 top-0 h-full place-self-center self-center"
              size={18}
            />
          </span>
        </div>
        <div className="relative flex w-full flex-col gap-2">
          <Label className="text-sm text-muted-foreground">Email</Label>
          <span className="relative min-h-[2.5rem] rounded-lg border px-3 py-2 text-sm">
            {member?.email}
            <Mail
              className="absolute bottom-0 right-4 top-0 h-full place-self-center self-center"
              size={18}
            />
          </span>
        </div>
        <div className="relative flex w-full flex-col gap-2">
          <Label className="text-sm text-muted-foreground">Phone Number</Label>
          <span className="relative min-h-[2.5rem] rounded-lg border px-3 py-2 text-sm">
            {member?.email}
            <Phone
              className="absolute bottom-0 right-4 top-0 h-full place-self-center self-center"
              size={18}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
