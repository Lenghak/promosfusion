"use client";

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

import { CouponDisplay } from "./coupon-display";

type CouponProvideProps = {
  campaignId: string;
};

const CouponProvide = ({ campaignId }: CouponProvideProps) => {
  const { mutate: provideCoupon, data: provideResponse } =
    useProvideCouponService(campaignId);

  return (
    <Dialog>
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

        <CouponDisplay response={provideResponse?.data} />
      </DialogContent>
    </Dialog>
  );
};

export { CouponProvide };
