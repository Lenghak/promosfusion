import { cn } from "@/lib/utils";

type H1Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function H1({ children, className }: H1Props) {
  return (
    <h1
      className={cn([
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      ])}
    >
      {children}
    </h1>
  );
}
