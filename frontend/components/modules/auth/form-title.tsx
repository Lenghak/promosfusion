import { H2 } from "@/components/ui/h2";

type FormTitleProps = {
  title: React.ReactNode;
  subTitle: React.ReactNode;
};

const FormTitle = ({ subTitle, title }: FormTitleProps) => {
  return (
    <section className="flex flex-col items-center">
      {/*//* Title */}
      <H2 className="text-center">{title}</H2>

      {/*//* Sub-Title */}
      <span className="max-w-sm text-center text-sm">{subTitle}</span>
    </section>
  );
};

export { FormTitle };
