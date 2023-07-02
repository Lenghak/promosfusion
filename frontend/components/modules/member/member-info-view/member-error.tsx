import React, { Fragment } from "react";

import { H3 } from "@/components/ui/h3";

type MemberErrorProps = {
  status: string;
};

const MemberError = ({ status }: MemberErrorProps) => {
  return (
    <article className="my-8 flex h-full min-h-[60vh] w-full flex-col items-center justify-center gap-2 self-center text-center">
      {status === "404" ? (
        <Fragment>
          <H3>404 | Error</H3>
          <p className="text-muted-foreground">
            No member found or has been deleted.
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <H3>Error</H3>
          <p className="text-muted-foreground">
            There was a problem getting your data. Please try again later.
          </p>
        </Fragment>
      )}
    </article>
  );
};

export { MemberError };
