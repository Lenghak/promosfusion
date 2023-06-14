import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { QrCode } from "lucide-react";

type QRScannerFormProps = {};

const QRScannerForm = ({}: QRScannerFormProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          variant: "default",
          className: "w-11 p-0",
        })}
      >
        <QrCode
          size={18}
          className="min-h-[1.125rem] min-w-[1.125rem]"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export { QRScannerForm };
