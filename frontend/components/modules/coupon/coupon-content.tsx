import { Logo } from "@/components/modules/logo";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type CouponContentProps = {};

const CouponContent = ({}: CouponContentProps) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center gap-3 rounded-t-lg bg-white p-6 text-neutral-900",
        "after:absolute after:-bottom-4 after:-left-4 after:h-8 after:w-8 after:rounded-full after:bg-background after:content-['']",
        "before:absolute before:-bottom-4 before:-right-4 before:h-8 before:w-8 before:rounded-full before:bg-background before:content-['']"
      )}
    >
      {/*//* Logo && title */}

      <Logo
        width={80}
        height={80}
        className={cn("my-2 h-20 w-20")}
        preference="light"
      />

      {/*//* Congratulations! */}
      <span className="flex flex-col text-center font-semibold">
        Congratulations! You got
      </span>

      {/*//* Coupon type! */}
      <span className="my-2 text-center text-2xl font-semibold">
        Buy 1 Free 1!
      </span>

      {/*//* Description */}
      <span className="text-center text-sm">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi odit
        possimus voluptas sapiente dolores consequuntur numquam quis.
      </span>

      {/*//* Coupon Code  */}
      <div className="relative mt-4 flex w-fit items-center gap-4 rounded-md border p-2 text-neutral-900">
        <span className="absolute -top-[0.6rem] bg-white px-2 text-center text-sm">
          Your code is
        </span>
        <span className="ml-4 w-fit text-center font-bold uppercase tracking-widest">
          sfdjXjwisdW23
        </span>
        <Button>Claim</Button>
      </div>
    </div>
  );
};

export { CouponContent };
