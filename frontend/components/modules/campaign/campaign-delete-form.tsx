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

import { useDeleteCampaignService } from "@/services/campaign";

import { useHandleDeleteEffect } from "@/hooks/campaign/use-handle-effect";
import { Loader2 } from "lucide-react";

const CampaignDeleteForm = ({
  campaignId,
  manual,
}: {
  campaignId: string;
  manual?: boolean;
}) => {
  const {
    mutate: deleteCampaign,
    isLoading: isDeletingCampaign,
    isSuccess: isCampaignDeleted,
    isError: isDeleteError,
  } = useDeleteCampaignService();

  useHandleDeleteEffect(isDeleteError, isCampaignDeleted);

  const { openDialog, dialogOpen, id: dialogId } = useDialogStore();

  const CAMPAIGN_DELETE_DIALOG_ID = `campaign-delete-dialog-${campaignId}`;

  return (
    <Fragment>
      <AlertDialog open={dialogOpen && dialogId === CAMPAIGN_DELETE_DIALOG_ID}>
        {!manual ? (
          <AlertDialogTrigger
            disabled={isDeletingCampaign}
            asChild
          >
            <Button
              className="whitespace-nowrap border-destructive text-destructive"
              variant={"outline"}
              onClick={() => openDialog(true, CAMPAIGN_DELETE_DIALOG_ID)}
            >
              Delete Campaign
            </Button>
          </AlertDialogTrigger>
        ) : null}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              campaign and remove the data from our servers including coupons.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => openDialog(false, CAMPAIGN_DELETE_DIALOG_ID)}
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
                  deleteCampaign(campaignId);
                  openDialog(false, CAMPAIGN_DELETE_DIALOG_ID);
                }}
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isDeletingCampaign && (
        <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 bg-background">
          <Loader2
            size={24}
            className={"animate-spin"}
          />
          <span>Deleting Campaign...</span>
        </div>
      )}
    </Fragment>
  );
};

export { CampaignDeleteForm };
