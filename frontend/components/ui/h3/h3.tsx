import { cn } from "@/lib/utils";

type H3Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function H3({ children, className }: H3Props) {
  return (
    <h3
      className={cn([
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      ])}
    >
      {children}
    </h3>
  );
}
