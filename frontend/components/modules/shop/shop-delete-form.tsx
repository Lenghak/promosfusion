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

import { useDeleteShopService } from "@/services/shop";

import { useHandleDeleteEffect } from "@/hooks/shop/use-handle-effect";
import { Loader2 } from "lucide-react";

const ShopDeleteForm = ({
  shopId,
  manual,
}: {
  shopId: string;
  manual?: boolean;
}) => {
  const {
    mutate: deleteShop,
    isLoading: isDeletingShop,
    isSuccess: isShopDeleted,
    isError: isDeleteError,
  } = useDeleteShopService();

  useHandleDeleteEffect(isDeleteError, isShopDeleted);

  const { openDialog, dialogOpen, id: dialogId } = useDialogStore();

  const SHOP_DELETE_DIALOG_ID = `shop-delete-dialog-${shopId}`;

  return (
    <Fragment>
      <AlertDialog open={dialogOpen && dialogId === SHOP_DELETE_DIALOG_ID}>
        {!manual ? (
          <AlertDialogTrigger
            disabled={isDeletingShop}
            asChild
          >
            <Button
              className={
                "whitespace-nowrap border-destructive text-destructive"
              }
              variant={"outline"}
            >
              Delete Shop
            </Button>
          </AlertDialogTrigger>
        ) : null}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete shop
              and remove the data from our servers including its campaigns and
              coupons.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => openDialog(false, SHOP_DELETE_DIALOG_ID)}
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
                  deleteShop(shopId);
                  openDialog(false, SHOP_DELETE_DIALOG_ID);
                }}
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isDeletingShop && (
        <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 bg-background">
          <Loader2
            size={24}
            className={"animate-spin"}
          />
          <span>Deleting Shop...</span>
        </div>
      )}
    </Fragment>
  );
};

export { ShopDeleteForm };
