import { FormTitle } from "@/components/modules/auth";
import { ResetPasswordForm } from "@/components/modules/auth/reset-password";



export default function ResetPassword() {
  return (
    <div className="flex h-full w-full max-w-md flex-col items-center gap-8 self-center p-4  md:max-w-none">
      <FormTitle
        title={`Confirm Reset Password`}
        subTitle={`We sent you a 6 digits verification code to reset your password.`}
      />

      <ResetPasswordForm />
    </div>
  );
}
