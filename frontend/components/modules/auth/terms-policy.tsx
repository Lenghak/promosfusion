"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Small } from "@/components/ui/small";

import { cn } from "@/lib/utils";

const TermsPolicy = () => {
  return (
    <section className="flex w-full justify-center">
      <Small className="w-full max-w-sm justify-self-center text-center text-sm">
        By proceeding, you agree with our{" "}
        <Link
          href={"/terms-conditions"}
          className={cn([
            buttonVariants({ variant: "link", size: "lg" }),
            "h-fit w-fit p-0",
          ])}
        >
          terms & conditions
        </Link>{" "}
        and our{" "}
        <Link
          href={"/privacy-policy"}
          className={cn([
            buttonVariants({ variant: "link", size: "lg" }),
            "h-fit w-fit p-0",
          ])}
        >
          privacy policy
        </Link>
      </Small>
    </section>
  );
};

export { TermsPolicy };
