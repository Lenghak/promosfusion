"use client";

import {  useState } from "react";

import { QrScanner } from "@yudiel/react-qr-scanner";

import { QrScannerViewFinder } from "./qr-scanner-view-finder";

const QrScannerView = () => {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className={"relative flex h-full max-h-min w-full p-8"}>
      <QrScanner
        onDecode={(result) => {
          setErrorMessage("");
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

      {errorMessage && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col place-content-center place-items-center gap-4 p-10">
          {errorMessage === "Permission denied" ? (
            <span className="text-center text-sm">
              Your browser has not allowed camera permission. Please allow
              camera permission for scanning.
            </span>
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
