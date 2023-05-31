import { FormTitle } from "@/components/modules/auth";
import { ResetPassowrdForm } from "@/components/modules/auth/reset-password";

type ResetPasswordProps = {};

export default function ResetPassword({}: ResetPasswordProps) {
  return (
    <div className="flex h-full w-full max-w-md flex-col items-center gap-8 self-center bg-white p-4 dark:bg-neutral-950 md:max-w-none">
      <FormTitle
        title={"Reset Password"}
        subTitle={
          "We will send a verification code to the email you entered below."
        }
      />

      <ResetPassowrdForm />
    </div>
  );
}
