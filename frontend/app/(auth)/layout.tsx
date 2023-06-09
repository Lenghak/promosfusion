import { TermsPolicy } from "@/components/modules/auth";
import { Logo } from "@/components/modules/logo";

type AuthLayoutProps = {
  children?: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-start gap-4 px-4 py-12">
      {/*//* The Auth Side : Extended to half screen after xs-screen | Expand when react xs:screen */}

      {/*//* The logo or brand name  */}
      <Logo
        className="h-16 w-16"
        width={64}
        height={64}
      />

      {/*//* The form contents */}
      {children}
      <TermsPolicy />
    </div>
  );
}
