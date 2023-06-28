"use client";

import { Dispatch, SetStateAction, useState } from "react";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useDialogStore } from "@/lib/zustand";

type DialogWithAlertProps = {
  dialogTrigger: React.ReactNode;
  dialogTitle?: React.ReactNode;
  dialogDescription?: React.ReactNode;
  children?: React.ReactNode;
  alertTitle?: React.ReactNode;
  alertDescription?: React.ReactNode;
};

const DialogWithAlert = ({
  dialogTrigger,
  dialogDescription,
  dialogTitle,
  children,
  alertTitle,
  alertDescription,
}: DialogWithAlertProps) => {
  const { alertOpen, dialogOpen, openAlert, openDialog } = useDialogStore(
    (state) => state
  );

  return (
    <>
      <Dialog
        onOpenChange={(open) => {
          open ? openDialog(true) : openAlert(true);
        }}
        open={dialogOpen}
      >
        {dialogTrigger}
        <DialogContent className="flex h-screen flex-col gap-4 sm:h-fit ">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                openDialog(true);
                openAlert(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                openDialog(false);
                openAlert(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export { DialogWithAlert };
