"use client";

import { useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  useGetCouponService,
  useRequestCouponService,
  useVerifyCouponService,
} from "@/services/coupon";

import { useHandleRequestEffect, useHandleVerifyEffect } from "@/hooks/coupon";
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

  const { get: getParam } = useSearchParams();

  const { replace } = useRouter();

  const { data: session } = useSession();

  const {
    data: coupon,
    isError: isGetCouponError,
    isLoading: isGettingCoupon,
  } = useGetCouponService(couponId);

  const {
    data: response,
    mutate: claimCoupon,
    isLoading: isClaiming,
    isSuccess: isClaimed,
    isError: isClaimError,
  } = useRequestCouponService(coupon?.data.cuid!!, getParam("token")!!);

  const {
    mutate: verifyCoupon,
    isLoading: isVerifying,
    isError: isVerifyError,
    isSuccess: isVerified,
  } = useVerifyCouponService(coupon?.data.cuid!!, getParam("token")!!);

  useHandleVerifyEffect(isVerifyError, isVerified);
  useHandleRequestEffect(isClaimError, isClaimed);

  useEffect(() => {
    if (isClaimed) replace(`${pathName}/?token=${response.data.token}`);
  }, [isClaimed, pathName, response, replace]);

  return coupon ? (
    <div
      className={
        "relative flex h-fit w-full max-w-xs flex-col place-self-center"
      }
    >
      {/* Coupon Content */}
      {coupon ? (
        <CouponContent
          cuid={coupon.data.cuid}
          logo={coupon.data.couponDisplay?.logo}
          companyName={coupon.data.couponDisplay?.campany}
          couponType={coupon.data.couponDisplay?.promotion}
          title={coupon.data.couponDisplay?.title}
          description={coupon.data.couponDisplay?.description}
          status={coupon.data.currentStatus}
          token={coupon.data.token}
          expiredAt={coupon.data.expiredAt}
        />
      ) : null}

      {coupon?.data.currentStatus !== "verified" && (
        <CouponQR
          cuid={couponId}
          token={`${
            process.env.NEXT_PUBLIC_URL
          }/coupons/${couponId}?token=${getParam("token")}`} // This is the token
          action={
            coupon?.data.currentStatus === "valid" &&
            session &&
            !isVerifying &&
            !isVerified ? (
              <Button onClick={() => verifyCoupon()}>Verify</Button>
            ) : coupon?.data.currentStatus === "new" &&
              !session &&
              !isClaiming ? (
              <Button
                onClick={() => claimCoupon()}
                disabled={isClaiming}
              >
                {isClaiming ? <Loader2 size={18} /> : "Claim"}
              </Button>
            ) : null
          }
        />
      )}
    </div>
  ) : isGettingCoupon ? (
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
