import { SignInForm } from "@/components/modules/auth/sign-in";
import { FormTitle } from "@/components/modules/auth";

type SignInProps = {};

export default function SignIn({}: SignInProps) {
  return (
    <div className="flex h-full w-full max-w-md flex-col items-center gap-8 self-center bg-white p-4 dark:bg-neutral-950 md:max-w-none">
      <FormTitle
        title={"Welcome Back!"}
        subTitle={"Let's get you started on Next-Social"}
      />

      <SignInForm />
    </div>
  );
}
