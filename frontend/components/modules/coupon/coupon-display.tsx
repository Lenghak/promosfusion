import { CouponProvideResponse } from "@/types/coupon";

import { CouponContent } from "./coupon-content";
import { CouponQR } from "./coupon-qr";

type Props = {
  response?: CouponProvideResponse;
};

const CouponDisplay = ({ response }: Props) => {
  const data = response?.data;

  return (
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

      <CouponQR cuid={data?.cuid} />
    </div>
  );
};

export { CouponDisplay };
