"use client";

import { useState } from "react";

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
};

const DialogWithAlert = ({
  dialogTrigger,
  dialogDescription,
  dialogTitle,
  children,
  alertTitle,
  alertDescription,
}: DialogWithAlertProps) => {
  const [dialogs, setDialogs] = useState({
    dialogOpen: false,
    alertOpen: false,
    confirmClose: false,
  });

  return (
    <>
      <Dialog
        onOpenChange={(open) => {
          open
            ? setDialogs((prev) => ({ ...prev, dialogOpen: true }))
            : setDialogs((prev) => ({
                ...prev,
                alertOpen: true,
              }));
        }}
        open={dialogs.dialogOpen}
      >
        {dialogTrigger}
        <DialogContent className="h-screen sm:h-fit">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>

      <AlertDialog open={dialogs.alertOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() =>
                setDialogs((prev) => ({
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
                setDialogs((prev) => ({
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
