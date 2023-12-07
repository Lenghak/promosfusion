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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { useDialogStore } from "@/lib/zustand";

type DialogWithAlertProps = {
  id: string;
  dialogTrigger: React.ReactNode;
  dialogTitle?: React.ReactNode;
  dialogDescription?: React.ReactNode;
  children?: React.ReactNode;
  alertTitle?: React.ReactNode;
  alertDescription?: React.ReactNode;
  className?: string;
};

const DialogWithAlert = ({
  id,
  dialogTrigger,
  dialogDescription,
  dialogTitle,
  children,
  alertTitle,
  alertDescription,
  className,
}: DialogWithAlertProps) => {
  const {
    alertOpen,
    dialogOpen,
    openAlert,
    openDialog,
    id: dialogId,
  } = useDialogStore((state) => state);

  return (
    <>
      <Dialog
        onOpenChange={(open) => {
          open ? openDialog(true, id) : openAlert(true, id);
        }}
        open={dialogOpen && id === dialogId}
      >
        {dialogTrigger}
        <DialogContent
          className={cn("flex h-screen flex-col gap-4 sm:h-fit", className)}
        >
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertOpen && id === dialogId}>
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                openDialog(true, id);
                openAlert(false, id);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                openDialog(false, id);
                openAlert(false, id);
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
