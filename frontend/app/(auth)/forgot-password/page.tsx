import Link from "next/link";

import { FormTitle } from "@/components/modules/auth";
import { ForgotPasswordForm } from "@/components/modules/auth/forgot-password";

import { ChevronLeft } from "lucide-react";

type ForgotPasswordProps = {};

export default function Page({}: ForgotPasswordProps) {
  return (
    <div className="flex h-full w-full max-w-md flex-col items-center gap-8 self-center p-4 md:max-w-none">
      <Link
        href={"/sign-in"}
        className="fixed left-8 top-8 flex items-center justify-center gap-4 hover:underline hover:underline-offset-2"
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
