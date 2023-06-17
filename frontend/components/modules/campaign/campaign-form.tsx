import { JSXElementConstructor, ReactElement } from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  useForm,
  UseFormStateReturn,
} from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type CampaignFormProps = {};

export default function CampaignForm({}: CampaignFormProps) {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm();

  return (
    <div>
      <Form {...form}>
        <FormField
          render={function ({
            field,
            fieldState,
            formState,
          }: {
            field: ControllerRenderProps<FieldValues, string>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<FieldValues>;
          }): ReactElement<any, string | JSXElementConstructor<any>> {
            throw new Error("Function not implemented.");
          }}
          name={""}
        ></FormField>
      </Form>
    </div>
  );
}
