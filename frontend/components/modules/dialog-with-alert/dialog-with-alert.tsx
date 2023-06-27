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

type DialogWithAlertProps = {
  dialogTrigger: React.ReactNode;
  dialogTitle?: React.ReactNode;
  dialogDescription?: React.ReactNode;
  children?: React.ReactNode;
  alertTitle?: React.ReactNode;
  alertDescription?: React.ReactNode;
  dialogState: {
    dialogOpen: boolean;
    alertOpen: boolean;
    confirmClose: boolean;
  };
  setDialogStates: Dispatch<
    SetStateAction<{
      dialogOpen: boolean;
      alertOpen: boolean;
      confirmClose: boolean;
    }>
  >;
};

const DialogWithAlert = ({
  dialogTrigger,
  dialogDescription,
  dialogTitle,
  children,
  alertTitle,
  alertDescription,
  dialogState,
  setDialogStates,
}: DialogWithAlertProps) => {
  return (
    <>
      <Dialog
        onOpenChange={(open) => {
          open
            ? setDialogStates((prev) => ({ ...prev, dialogOpen: true }))
            : setDialogStates((prev) => ({
                ...prev,
                alertOpen: true,
              }));
        }}
        open={dialogState?.dialogOpen}
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

      <AlertDialog open={dialogState?.alertOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() =>
                setDialogStates((prev) => ({
                  ...prev,
                  dialogOpen: true,
                  alertOpen: false,
                }))
              }
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                setDialogStates((prev) => ({
                  ...prev,
                  dialogOpen: false,
                  alertOpen: false,
                }))
              }
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
