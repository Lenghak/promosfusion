import { CouponContent, CouponQR } from "@/components/modules/coupon";
import { Button } from "@/components/ui/button";

type CouponProps = {};

export default function CouponDisplay({}: CouponProps) {
  return (
    <section className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-4 overflow-y-auto rounded-lg bg-accent p-8 dark:bg-background">
      {/*//* Page title and, or back button  */}
      <div className="absolute top-8 flex w-full"></div>

      <div className={"relative flex h-full max-h-72 w-max max-w-2xl"}>
        {/*//* Coupon Content */}
        <CouponContent
          title="Congratulation"
          couponToken=""
          couponType="By 1 Get 1 Free"
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore, neque."
          expireDate="23-July-2023"
        />

        <CouponQR
          code="wre;adsvj23jwlsdjf;lajf32oifjao"
          action={<Button className="w-full">Claim Coupon</Button>}
        />
      </div>
    </section>
  );
}
