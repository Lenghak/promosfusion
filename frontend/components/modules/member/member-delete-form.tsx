"use client";

import { Fragment } from "react";

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

import { useDialogStore } from "@/lib/zustand";

import { useDeleteMemberService } from "@/services/member";

import { useHandleDeleteEffect } from "@/hooks/member/use-handle-effect";
import { Loader2 } from "lucide-react";

const MemberDeleteForm = ({
  memberId,
  manual,
}: {
  memberId: string;
  manual?: boolean;
}) => {
  const {
    mutate: deleteMember,
    isLoading: isDeletingMember,
    isSuccess: isMemberDeleted,
    isError: isDeleteError,
  } = useDeleteMemberService();

  useHandleDeleteEffect(isDeleteError, isMemberDeleted);

  const { openDialog, dialogOpen, id: dialogId } = useDialogStore();

  const MEMBER_DELETE_DIALOG_ID = `member-delete-dialog-${memberId}`;

  return (
    <Fragment>
      <AlertDialog open={dialogOpen && dialogId === MEMBER_DELETE_DIALOG_ID}>
        {!manual ? (
          <AlertDialogTrigger
            disabled={isDeletingMember}
            asChild
          >
            <Button
              className={
                "whitespace-nowrap border-destructive text-destructive"
              }
              variant={"outline"}
            >
              Delete Account
            </Button>
          </AlertDialogTrigger>
        ) : null}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              account and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => openDialog(false, MEMBER_DELETE_DIALOG_ID)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                className={
                  "bg-destructive text-destructive-foreground hover:bg-destructive/80"
                }
                variant={"destructive"}
                onClick={() => {
                  deleteMember(memberId);
                  openDialog(false, MEMBER_DELETE_DIALOG_ID);
                }}
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isDeletingMember && (
        <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 bg-background">
          <Loader2
            size={24}
            className={"animate-spin"}
          />
          <span>Deleting Member...</span>
        </div>
      )}
    </Fragment>
  );
};

export { MemberDeleteForm };
