import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

type NavLinkProps = LinkProps & {
  exact?: boolean;
  children?: React.ReactNode;
  className?: string;
};

const NavLink = ({
  href,
  exact,
  children,
  className,
  ...props
}: NavLinkProps) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(`${href}`);

  if (isActive) {
    className += " active";
  }

  return (
    <Link
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
};

export { NavLink };
