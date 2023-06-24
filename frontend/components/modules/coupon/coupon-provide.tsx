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
  DialogTrigger,
} from "@/components/ui/dialog";

import { useProvideCouponService } from "@/services/coupon";

import { Plus } from "lucide-react";

import { CouponContent } from "./coupon-content";
import { CouponQR } from "./coupon-qr";

type CouponProvideProps = {
  campaignId: string;
};

const CouponProvide = ({ campaignId }: CouponProvideProps) => {
  const { mutate: provideCoupon, data: provideResponse } =
    useProvideCouponService(campaignId);

  const [dialogs, setDialogs] = useState({
    dialogOpen: false,
    alertOpen: false,
    confirmClose: false,
  });

  const data = provideResponse?.data.data;

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
          onClick={() => provideCoupon()}
        >
          <Plus size={18} />
        </DialogTrigger>
        <DialogContent className="h-screen sm:h-fit">
          <DialogHeader>
            <DialogTitle>Providing Coupon</DialogTitle>
            <DialogDescription>
              The customer must scan this coupon to claim.
            </DialogDescription>
          </DialogHeader>

          {data ? (
            <div
              className={
                "relative flex h-fit w-full max-w-xs flex-col place-self-center"
              }
            >
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
            </div>
          ) : null}
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
