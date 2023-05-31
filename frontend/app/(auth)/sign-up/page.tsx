import { FormTitle } from "@/components/modules/auth";
import { SignUpForm } from "@/components/modules/auth/sign-up";

type SignUpProps = {};

export default function SignUp({}: SignUpProps) {
  return (
    <div className="flex h-full w-full max-w-md flex-col items-center gap-8 self-center bg-white p-4 dark:bg-neutral-950 md:max-w-none">
      <FormTitle
        title={`Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}`}
        subTitle={`Let's get you started on ${process.env.NEXT_PUBLIC_APP_NAME}`}
      />

      <SignUpForm />
    </div>
  );
}
