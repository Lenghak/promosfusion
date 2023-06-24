"use client";

import { useGetCouponService } from "@/services/coupon";

import { Loader2 } from "lucide-react";

import { CouponContent } from "./coupon-content";
import CouponError from "./coupon-error";
import { CouponQR } from "./coupon-qr";

type Props = {
  couponId: string;
};

//! This page is only for the SSR
const CouponDisplay = ({ couponId }: Props) => {
  const {
    data: axiosResponse,
    isError,
    isLoading,
  } = useGetCouponService(couponId);
  return axiosResponse?.cuid && !isError && !isLoading ? (
    <div
      className={
        "relative flex h-fit w-full max-w-xs flex-col place-self-center"
      }
    >
      {/* Coupon Content */}
      <CouponContent
        cuid={axiosResponse?.cuid}
        logo={axiosResponse?.couponDisplay?.logo}
        companyName={axiosResponse?.couponDisplay?.campany}
        couponType={axiosResponse?.couponDisplay?.promotion}
        title={axiosResponse?.couponDisplay?.title}
        description={axiosResponse?.couponDisplay?.description}
      />

      <CouponQR
        cuid={couponId}
        token={couponId} // This is the token
      />
    </div>
  ) : isLoading ? (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2
        size={48}
        className="animate-spin"
      />
    </div>
  ) : isError ? (
    <CouponError />
  ) : null;
};

export { CouponDisplay };
