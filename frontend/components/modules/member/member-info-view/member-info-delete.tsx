"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useDeleteMemberService } from "@/services/member";

import { useHandleDeleteEffect } from "@/hooks/member/use-handle-effect";
import { usePermission } from "@/hooks/member/use-permission";

import { Member } from "@/types/member";

const MemberInfoDelete = ({ member }: { member: Member }) => {
  const permission = usePermission();

  const {
    mutate: deleteMember,
    isLoading: isDeletingMember,
    isSuccess: isMemberDeleted,
    isError: isDeleteError,
  } = useDeleteMemberService();

  useHandleDeleteEffect(isDeleteError, isMemberDeleted);

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

      <AlertDialog>
        <AlertDialogTrigger
          disabled={isDeletingMember}
          asChild
        >
          <Button
            className={"whitespace-nowrap border-destructive text-destructive"}
            variant={"outline"}
          >
            Delete Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              account and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                className={
                  "bg-destructive text-destructive-foreground hover:bg-destructive/80"
                }
                variant={"destructive"}
                onClick={() => deleteMember(`${member.id}`)}
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ) : null;
};

export { MemberInfoDelete };
