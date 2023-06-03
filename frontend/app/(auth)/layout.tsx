import { TermsPolicy } from "@/components/modules/auth";
import { Logo } from "@/components/modules/logo";

type AuthLayoutProps = {
  children?: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-full w-full items-center justify-center gap-4 p-4 flex-col min-h-screen">
      {/*//* The Auth Side : Extended to half screen after xs-screen | Expand when react xs:screen */}

      {/*//* The logo or brand name  */}
      <Logo className="w-20 h-20" />

      {/*//* The form contents */}
      {children}
      <TermsPolicy />
    </div>
  );
}
