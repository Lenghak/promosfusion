import { FormTitle } from "@/components/modules/auth";
import { SignInForm } from "@/components/modules/auth/sign-in";

type SignInProps = {};

export default function Page({}: SignInProps) {
  return (
    <div className="flex h-full w-full max-w-md flex-col items-center gap-8 self-center p-4 md:max-w-none">
      <FormTitle
        title={"Welcome Back!"}
        subTitle={"Let's get you started on Next-Social"}
      />

      <SignInForm />
    </div>
  );
}
