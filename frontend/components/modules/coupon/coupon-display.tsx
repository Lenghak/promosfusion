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
import { isAxiosError } from "axios";
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
    isPending: isGettingCoupon,
    error: couponError,
  } = useGetCouponService(couponId);

  const {
    data: response,
    mutate: claimCoupon,
    isPending: isClaiming,
    isSuccess: isClaimed,
    isError: isClaimError,
    error: claimError,
  } = useRequestCouponService(coupon?.data.cuid!!, getParam("token")!!);

  const {
    mutate: verifyCoupon,
    isPending: isVerifying,
    isError: isVerifyError,
    error: verifyError,
    isSuccess: isVerified,
  } = useVerifyCouponService(coupon?.data.cuid!!, getParam("token")!!);

  useHandleVerifyEffect(isVerifyError, isVerified, verifyError as Error);
  useHandleRequestEffect(isClaimError, isClaimed, claimError as Error);

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
          companyName={coupon.data.couponDisplay?.company}
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
            session?.user.token &&
            !isVerifying &&
            !isVerified ? (
              <Button onClick={() => verifyCoupon()}>Verify</Button>
            ) : coupon?.data.currentStatus === "new" &&
              !session?.user.token &&
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
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <Loader2
        size={48}
        className="animate-spin"
      />
      <span>Getting Coupon...</span>
    </div>
  ) : isGetCouponError ? (
    <CouponError
      status={
        isAxiosError(couponError) ? `${couponError.response?.status}` : "400"
      }
    />
  ) : null;
};

export { CouponDisplay };
