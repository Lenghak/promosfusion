import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Upload } from "lucide-react";

type ShopBasicLogoProps = {
  logo?: string;
  shopName?: string;
};

const ShopBasicLogo = ({ logo, shopName }: ShopBasicLogoProps) => {
  return (
    <div className="flex h-fit w-full flex-col gap-1 p-4 lg:flex-row">
      <div className="flex w-full flex-col gap-2">
        <span className="font-semibold">Shop Logo</span>
        <span className="text-sm capitalize text-muted-foreground">
          This logo will be displayed on the coupon
        </span>
      </div>
      {logo ? (
        <div className="relative flex w-full items-center gap-4 py-2">
          <div className="flex items-center gap-4">
            <Avatar className="relative h-24 w-24">
              <AvatarImage
                src={logo}
                alt={shopName}
              />
              <AvatarFallback className="font-semibold uppercase">
                {shopName?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <Button
              className="gap-4"
              variant={"outline"}
            >
              <Upload size={18} />
              <span>Upload Logo</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="16[w-160px] h-4" />
          </div>
        </div>
      )}
    </div>
  );
};

export { ShopBasicLogo };
