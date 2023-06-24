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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useProvideCouponService } from "@/services/coupon";

import { Loader2, Plus } from "lucide-react";

import { CouponContent } from "./coupon-content";
import { CouponQR } from "./coupon-qr";

type CouponProvideProps = {
  campaignId: string;
};

const CouponProvide = ({ campaignId }: CouponProvideProps) => {
  const {
    mutate: generateCoupon,
    data: generateResponse,
    isError: isGenerateError,
    isLoading: isGenerating,
  } = useProvideCouponService(campaignId);

  const [dialogs, setDialogs] = useState({
    dialogOpen: false,
    alertOpen: false,
    confirmClose: false,
  });

  const data = generateResponse?.data.data;

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
        <DialogTrigger
          className="p-2"
          onClick={() => generateCoupon()}
        >
          <Plus size={18} />
        </DialogTrigger>
        <DialogContent className="h-screen sm:h-fit">
          <DialogHeader>
            <DialogTitle>
              {isGenerateError ? "Generate Error" : "Providing Coupon"}
            </DialogTitle>
            <DialogDescription>
              {isGenerateError
                ? "There was a problem generating the coupon."
                : "The customer must scan this coupon to claim."}
            </DialogDescription>
          </DialogHeader>

          <div
            className={
              "relative flex h-fit w-full max-w-xs flex-col items-center justify-center place-self-center"
            }
          >
            {isGenerating ? (
              <>
                <Loader2
                  size={48}
                  className="my-4 animate-spin"
                />
                <span>Generating Coupon ...</span>
              </>
            ) : data ? (
              <>
                {/*//* Coupon Content */}
                <CouponContent
                  cuid={data?.cuid}
                  logo={data?.couponDisplay.logo}
                  companyName={data?.couponDisplay.campany}
                  couponType={data?.couponDisplay.promotion}
                  title={data?.couponDisplay.title}
                  description={data?.couponDisplay.description}
                />

                <CouponQR
                  cuid={data.cuid}
                  token={data.cuid}
                />
              </>
            ) : isGenerateError ? (
              <>
                <div className="flex w-full gap-4">
                  <Button
                    variant={"outline"}
                    className="w-40"
                  >
                    Cancel
                  </Button>
                  <Button className="w-40">Rety</Button>
                </div>
              </>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={dialogs.alertOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will leave this page. You can view the coupon later by select
              from campaign.
            </AlertDialogDescription>
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

export { CouponProvide };
