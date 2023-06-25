"use client";

import { Ribbon } from "react-ribbons";

import Image from "next/image";

import { Logo } from "@/components/modules/logo";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Copy, Download, XCircle } from "lucide-react";

type CouponProps = {
  title?: string;
  description?: string;
  couponType?: string;
  companyName?: string;
  logo?: string;
  expireDate?: string;
  cuid?: string;
  status?: string;
};

const CouponContent = ({
  cuid,
  couponType,
  description,
  expireDate,
  title,
  companyName = "Coupon Flare",
  logo,
  status,
}: CouponProps) => {
  const { toast } = useToast();

  //* copy to clipboard hanler
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`http://coupon-flare.vercel.app/coupons/${cuid}`)
      .then(() =>
        toast({
          description: (
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <CheckCircle
                  size={18}
                  className="text-green-500"
                />
                <span className="font-bold">Link Copied to Clipboard</span>
              </div>
              You can paste the link in your brower to view this coupon.
            </div>
          ),
        })
      )
      .catch(() =>
        toast({
          description: (
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <XCircle
                  size={18}
                  className="text-destructive"
                />
                <span className="font-bold">Failed to Copy</span>
              </div>
              There was a problem copying you coupon. You can copy the url
              manually.
            </div>
          ),
        })
      );
  };

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center gap-3 rounded-xl border-b-2 border-dashed bg-accent p-6 shadow-lg",
        status === "verified" ? "border-0" : ""
      )}
    >
      <div className="flex items-center justify-center gap-8">
        {logo ? (
          <Image
            src={logo}
            width={80}
            height={80}
            alt="Company Logo"
            className="my-2 h-20 w-20"
          />
        ) : (
          <Logo
            width={80}
            height={80}
            className={"my-2 h-20 w-20"}
          />
        )}
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-semibold capitalize">{companyName}</span>
          {/*//* Coupon type! */}
          <span className="text-center text-xl font-bold">
            {couponType ?? "Buy 1 Free 1!"}
          </span>
        </div>
      </div>

      {/*//* Title */}
      <span className="text-lg font-bold capitalize">{title}</span>

      {/*//* Description */}
      <span className="mb-2 max-h-20 max-w-sm overflow-hidden text-ellipsis whitespace-break-spaces text-center text-sm">
        {description}
      </span>

      <div className="flex w-full items-center justify-between">
        <Button
          className="h-fit w-fit rounded-full p-2"
          variant={"ghost"}
          title={"Download"}
        >
          <Download size={18} />
        </Button>

        <span className="rounded-lg border border-dashed px-4 py-2 text-center text-xs font-medium">
          EXP : <span className="font-semibold">{expireDate}</span>
        </span>

        <Button
          className="h-fit w-fit rounded-full p-2"
          variant={"ghost"}
          onClick={() => copyToClipboard()}
          title={"Copy URL"}
        >
          <Copy size={18} />
        </Button>
      </div>

      {/* Ribbon */}

      <Ribbon
        side="right"
        type="corner"
        size="large"
        backgroundColor="hsl(var(--secondary))"
        color="hsl(var(--secondary-foreground))"
        fontFamily="Fira Mono, monospace"
        withStripes={false}
      >
        <span className="text-sm font-bold uppercase text-secondary-foreground">
          {status === "verified" ? "used" : status}
        </span>
      </Ribbon>
    </div>
  );
};

export { CouponContent };
