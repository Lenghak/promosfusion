"use client";

import { useState } from "react";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { CameraOff } from "lucide-react";

import { QrScannerViewFinder } from "./qr-scanner-view-finder";

const QrScannerView = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();
  return (
    <div className={"relative flex h-full max-h-min w-full flex-col gap-4 p-8"}>
      <QrScanner
        onDecode={(result) => {
          setErrorMessage("");
          toast({
            duration: Infinity,
            title: "Coupon Scanned Successfully",
            description: "You can view and verify the coupon.",
            action: (
              <Link
                href={result}
                className={buttonVariants({ variant: "link" })}
              >
                View Coupon
              </Link>
            ),
          });
        }}
        onError={(error) => {
          if (error.message === "Permission denied") {
            setErrorMessage(error.message);
          }
        }}
        viewFinder={() => <QrScannerViewFinder />}
        scanDelay={3000}
        hideCount
      />

      {/* <div className="flex flex-col items-center justify-center gap-4 text-center">
        Coupon Scanned
        <Link
          href={result}
          className={buttonVariants({
            variant: "ghost",
            className: "underline underline-offset-4",
          })}
        >
          View Coupon
        </Link>
      </div> */}

      {errorMessage && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col place-content-center place-items-center gap-4 p-14">
          {errorMessage === "Permission denied" ? (
            <>
              <CameraOff size={48} />
              <span className="text-center text-sm">
                Your browser does not have access to the camera. Please allow
                camera permission for scanning.
              </span>
            </>
          ) : (
            <span className="text-center text-sm">
              There was a problem accessing your camera. Please try again later.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export { QrScannerView };
