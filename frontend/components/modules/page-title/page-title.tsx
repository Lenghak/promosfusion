"use client";

import { Fragment, useMemo } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type PageTitleProps = {
  title: string;
  description: string;
  className?: string;
};

const PageTitle = ({ title, description, className }: PageTitleProps) => {
  const pathName: string[] = usePathname().split("/");

  const breadCrumbPath: string[] = useMemo(() => {
    const array: string[] = [];
    pathName.reduce((acc, current, index) => {
      array[index] = acc + "/" + current;
      return array[index];
    });

    return array.filter((path) => path);
  }, [pathName]);

  return (
    <section
      className={cn(
        "flex w-full items-center justify-between gap-1 py-4",
        className
      )}
    >
      <div className="flex flex-col items-start justify-center">
        <span className="text-2xl font-bold">{title}</span>
        <span className="text-sm text-muted-foreground">{description}</span>
      </div>

      {/* Bread Crumb */}
      <div className="hidden gap-2 text-center text-sm font-semibold capitalize sm:flex">
        {breadCrumbPath.map((path, index) => (
          <Fragment key={index}>
            /<Link href={path}>{pathName[index + 1]}</Link>
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export { PageTitle as default };
