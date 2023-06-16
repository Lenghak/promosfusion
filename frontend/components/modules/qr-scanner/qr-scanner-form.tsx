import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { QrCode } from "lucide-react";

import { QrScannerView } from "./qr-scanner-view";

type QRScannerFormProps = {};

const QRScannerForm = ({}: QRScannerFormProps) => {
  return (
    <Sheet modal={false}>
      <SheetTrigger
        className={buttonVariants({
          variant: "default",
          className: "w-11 p-0",
        })}
      >
        <QrCode
          size={18}
          className="min-h-[1.125rem] min-w-[1.125rem]"
        />
      </SheetTrigger>
      <SheetContent className="w-full md:w-1/2 lg:w-1/3">
        <SheetHeader>
          <SheetTitle className="text-center">Coupon Scanning</SheetTitle>
          <SheetDescription className="text-center">
            Display the QR code right inside the scanning box for scanning.
          </SheetDescription>

          <QrScannerView />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export { QRScannerForm };
