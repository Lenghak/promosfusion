import Link from "next/link";

import { FormTitle } from "@/components/modules/auth";
import { ForgotPasswordForm } from "@/components/modules/auth/forgot-password";

import { ChevronLeft } from "lucide-react";

type ForgotPasswordProps = {};

export default function ForgotPassword({}: ForgotPasswordProps) {
  return (
    <div className="flex h-full w-full max-w-md flex-col items-center gap-8 self-center p-4 md:max-w-none">
      <Link
        href={"/sign-in"}
        className="flex gap-4 items-center justify-center hover:underline hover:underline-offset-2 fixed top-8 left-8"
      >
        <ChevronLeft />
        <span>Back</span>
      </Link>

      <FormTitle
        title={"Reset Password"}
        subTitle={
          "We will send a verification code to the email you entered below."
        }
      />

      <ForgotPasswordForm />
    </div>
  );
}
