import { FormTitle } from "@/components/modules/auth";
import { ForgotPasswordForm } from "@/components/modules/auth/forgot-password";

type ForgotPasswordProps = {};

export default function ForgotPassword({}: ForgotPasswordProps) {
  return (
    <div className="flex h-full w-full max-w-md flex-col items-center gap-8 self-center bg-white p-4 dark:bg-neutral-950 md:max-w-none">
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
