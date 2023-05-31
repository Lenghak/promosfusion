import { FormTitle } from "@/components/modules/auth";
import { NewPasswordForm } from "@/components/modules/auth/new-password";

type ConfirmOTPProps = {};

export default function ConfirmOTP({}: ConfirmOTPProps) {
  return (
    <div className="flex h-full w-full max-w-md flex-col items-center gap-8 self-center bg-white p-4 dark:bg-neutral-950 md:max-w-none">
      <FormTitle
        title={`Confirm Reset Password`}
        subTitle={`We sent you a 6 digits verification code to reset your password.`}
      />

      <NewPasswordForm />
    </div>
  );
}