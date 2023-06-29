"use client";

import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import { useProvideCouponService } from "@/services/coupon";

import { Loader2, Plus } from "lucide-react";

import { DialogWithAlert } from "../dialog-with-alert";
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

  const coupon = generateResponse?.data.data;

  return (
    <DialogWithAlert
      id="coupon-provide-dialog"
      dialogTitle={isGenerateError ? "Generate Error" : "Providing Coupon"}
      dialogDescription={
        isGenerateError
          ? "There was a problem generating the coupon."
          : "The customer must scan this coupon to claim."
      }
      dialogTrigger={
        <DialogTrigger
          className="p-2"
          onClick={() => generateCoupon()}
        >
          <Plus size={18} />
        </DialogTrigger>
      }
      alertTitle={"Are you absolutely sure?"}
      alertDescription={
        "You will leave this page. You can view the coupon later by select from campaign."
      }
    >
      {
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
          ) : coupon ? (
            <>
              {/*//* Coupon Content */}
              <CouponContent
                cuid={coupon.cuid}
                logo={coupon.couponDisplay.logo}
                companyName={coupon.couponDisplay.campany}
                couponType={coupon.couponDisplay.promotion}
                title={coupon.couponDisplay.title}
                description={coupon.couponDisplay.description}
                status={coupon.currentStatus}
                expiredAt={coupon.expiredAt}
                token={coupon.token}
              />

              <CouponQR
                cuid={coupon.cuid}
                token={`${process.env.NEXT_PUBLIC_URL}/coupons/${coupon.cuid}?token=${coupon.token}`}
              />
            </>
          ) : isGenerateError ? (
            <>
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <span className="text-center text-sm">
                  Looks like we have a problem generating coupon. Would you like
                  to retry?
                </span>
                <Button
                  className="w-40"
                  onClick={() => generateCoupon()}
                >
                  Retry
                </Button>
              </div>
            </>
          ) : null}
        </div>
      }
    </DialogWithAlert>
  );
};

export { CouponProvide };
