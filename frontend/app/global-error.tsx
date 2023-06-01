"use client";

type ErrorProps = {};

export default function Error({}: ErrorProps) {
  return (
    <div className="w-full h-full min-h-screen grid place-content-center place-items-center">
      <span className="text-xl">
        <b>500 |</b> Internal Server Error
      </span>
    </div>
  );
}
