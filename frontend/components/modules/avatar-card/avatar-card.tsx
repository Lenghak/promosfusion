import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

type AvatarCardProps = {
  name: string;
  info: string;
  image: string;
  className?: string;
};

const AvatarCard = ({ name, info, image, className }: AvatarCardProps) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer flex-nowrap items-center gap-4",
        className
      )}
    >
      <Avatar className={"cursor-pointer"}>
        <AvatarImage src={image} />
        <AvatarFallback className="font-medium uppercase">
          {name.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex h-full flex-col justify-between">
        <span>{name}</span>
        <span className="text-xs font-normal text-muted-foreground">
          {info}
        </span>
      </div>
    </div>
  );
};

export { AvatarCard };
