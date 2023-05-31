import { cn } from "@/lib/utils";

type H2Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function H2({ children, className }: H2Props) {
  return (
    <h2
      className={cn([
        "scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className,
      ])}
    >
      {children}
    </h2>
  );
}
