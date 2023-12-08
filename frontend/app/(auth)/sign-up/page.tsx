import { FormTitle } from "@/components/modules/auth";
import { SignUpForm } from "@/components/modules/auth/sign-up";



export default function SignUp() {
  return (
    <div className="flex h-full w-full max-w-md flex-col items-center gap-8 self-center p-4 md:max-w-none">
      <FormTitle
        title={`Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}`}
        subTitle={`Let's get you started on ${process.env.NEXT_PUBLIC_APP_NAME}`}
      />

      <SignUpForm />
    </div>
  );
}
