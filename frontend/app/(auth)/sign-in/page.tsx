import { FormTitle } from "@/components/modules/auth";
import { SignInForm } from "@/components/modules/auth/sign-in";

export default function SignIn() {
  return (
    <div className="flex h-full w-full max-w-md flex-col items-center gap-8 self-center p-4 md:max-w-none">
      <FormTitle
        title={"Welcome Back!"}
        subTitle={`Let's get you started on ${process.env.NEXT_PUBLIC_APP_NAME}`}
      />

      <SignInForm />
    </div>
  );
}
