import { H3 } from "@/components/ui/h3";

type UnderConstructionProps = {};

export const UnderConstruction = ({}: UnderConstructionProps) => {
  return (
    <article className="my-8 flex h-full w-full flex-col items-center justify-center gap-2 self-center text-center">
      <H3>Under Construction Process</H3>
      <p className="text-muted-foreground">
        This page is still under the development process.{" "}
      </p>
    </article>
  );
};


