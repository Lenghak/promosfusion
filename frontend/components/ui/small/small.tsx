import { cn } from "@/lib/utils";

type SmallProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function Small({ children, className }: SmallProps) {
  return (
    <small className={cn(["text-sm font-medium leading-none", className])}>
      {children}
    </small>
  );
}
