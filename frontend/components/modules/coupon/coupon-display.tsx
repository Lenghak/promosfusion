"use client";

import { useGetCouponService } from "@/services/coupon";

import { CouponContent } from "./coupon-content";
import { CouponQR } from "./coupon-qr";

type Props = {
  couponId: string;
};

const CouponDisplay = ({ couponId }: Props) => {
  const { data: axiosResponse, isLoading } = useGetCouponService(couponId);

  return (
    <div
      className={
        "relative flex h-fit w-full max-w-xs flex-col place-self-center"
      }
    >
      {/*//* Coupon Content */}
      <CouponContent
        cuid={axiosResponse?.data?.cuid}
        logo={axiosResponse?.data?.couponDisplay.logo}
        companyName={axiosResponse?.data?.couponDisplay.campany}
        couponType={axiosResponse?.data?.couponDisplay.promotion}
        title={axiosResponse?.data?.couponDisplay.title}
        description={axiosResponse?.data?.couponDisplay.description}
      />

      <CouponQR cuid={axiosResponse?.data?.cuid} />
    </div>
  );
};

export { CouponDisplay };
