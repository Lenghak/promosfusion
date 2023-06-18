import {
  CouponContent,
  CouponQR,
  CouponSeparator,
} from "@/components/modules/coupon";

import { cn } from "@/lib/utils";

import { Download, Info } from "lucide-react";

type CouponProps = {};

export default function CouponDisplay({}: CouponProps) {
  return (
    <section className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-4 overflow-y-auto rounded-sm p-8">
      {/*//* Page title and, or back button  */}
      <div className="absolute top-8 flex w-full"></div>

      {/*//* Coupon Content */}

      <div className={cn("relative flex h-fit w-max max-w-xs flex-col")}>
        <CouponContent />

        {/*//* Separator */}
        <CouponSeparator />
        {/*//*Footer */}
        <div
          className={cn(
            "flex w-full flex-col items-center justify-between gap-4 rounded-b-lg bg-white p-6"
          )}
        >
          {/*//* QR Code */}
          <CouponQR code="sfdjXjwisdW23" />

          <span className="w-full text-center text-xs font-medium text-neutral-900">
            Valid till : <span className="font-semibold">23-July-2023</span>
          </span>
        </div>
      </div>
    </section>
  );
}
