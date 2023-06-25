"use client";

import { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  useGetCouponService,
  useRequestCouponService,
  useVerifyCouponService,
} from "@/services/coupon";

import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

import { CouponContent } from "./coupon-content";
import { CouponError } from "./coupon-error";
import { CouponQR } from "./coupon-qr";

type CouponDisplayProps = {
  couponId: string;
};

//! This page is only for the SSR
const CouponDisplay = ({ couponId }: CouponDisplayProps) => {
  const pathName = usePathname();

  const { replace } = useRouter();

  const { data: session } = useSession();

  const {
    data: coupon,
    isError: isGetCouponError,
    isLoading: isGettingCoupon,
    isFetching: isFetchingCoupon,
  } = useGetCouponService(couponId);

  const {
    mutate: requestCoupon,
    isLoading: isRequesting,
    isSuccess: isRequested,
    data: response,
  } = useRequestCouponService(coupon?.cuid!!);

  useEffect(() => {
    if (isRequested)
      replace(`${pathName}/?token=${response.data.token}`, {
        forceOptimisticNavigation: true,
      });
  }, [isRequested, pathName, response, replace]);

  return coupon ? (
    <div
      className={
        "relative flex h-fit w-full max-w-xs flex-col place-self-center"
      }
    >
      {/* Coupon Content */}
      <CouponContent
        cuid={coupon?.cuid}
        logo={coupon?.couponDisplay?.logo}
        companyName={coupon?.couponDisplay?.campany}
        couponType={coupon?.couponDisplay?.promotion}
        title={coupon?.couponDisplay?.title}
        description={coupon?.couponDisplay?.description}
      />

      <CouponQR
        cuid={couponId}
        token={response?.data.token ?? couponId} // This is the token
        action={
          coupon?.currentStatus === "valid" && session ? (
            <Button>Verify</Button>
          ) : coupon?.currentStatus === "new" && !session ? (
            <Button
              onClick={() => requestCoupon()}
              disabled={isRequesting}
            >
              {!isRequesting ? <Loader2 size={18} /> : "Claim"}
            </Button>
          ) : null
        }
      />

      {/* Action Buttons */}
    </div>
  ) : isGettingCoupon || isFetchingCoupon ? (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2
        size={48}
        className="animate-spin"
      />
    </div>
  ) : isGetCouponError ? (
    <CouponError />
  ) : null;
};

export { CouponDisplay };
