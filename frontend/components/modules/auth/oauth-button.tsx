import Image from "next/image";

import { Button } from "@/components/ui/button";

type Props = {};

const OAuthButtons = ({}: Props) => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row ">
      {/*//* Continue with google button */}
      <Button
        className="w-full max-w-sm gap-4"
        variant={"outline"}
        type="button"
      >
        <Image
          src={"/svg/google.svg"}
          width={20}
          height={20}
          alt="google-logo"
        />
        <span>Google</span>
      </Button>

      {/*//* Continue with google button */}
      <Button
        className="max-h-10 w-full max-w-sm gap-4"
        variant={"outline"}
        size={"lg"}
        type="button"
      >
        <Image
          src={"/svg/facebook.svg"}
          width={28}
          height={28}
          alt="facebook-logo"
        />
        <span>Facebook</span>
      </Button>
    </section>
  );
};

export { OAuthButtons };
