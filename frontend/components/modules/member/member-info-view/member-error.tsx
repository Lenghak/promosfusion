import React from "react";

import { H3 } from "@/components/ui/h3";

type Props = {};

const MemberError = ({}: Props) => {
  return (
    <article className="my-8 flex h-full w-full flex-col items-center justify-center gap-2 self-center text-center">
      <H3>Erorr</H3>
      <p className="text-muted-foreground">
        There was a problem getting your data. Please try again later.
      </p>
    </article>
  );
};

export { MemberError };
