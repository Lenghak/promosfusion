import { TermsPolicy } from "@/components/modules/auth";

type AuthLayoutProps = {
  children?: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-full w-full place-content-center place-items-center gap-4 p-4 flex-col">
      {/*//* The Auth Side : Extended to half screen after xs-screen | Expand when react xs:screen */}

      {/*//* The logo or brand name  */}
      {/* <Logo /> */}

      {/*//* The form contents */}
      {children}
      <TermsPolicy />
    </div>
  );
}
