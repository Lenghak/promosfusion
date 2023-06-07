"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const newPassword = z.object({
  otp: z.coerce.number({
    invalid_type_error: "Only numbers are accepted",
  }),
});

type ResetPasswordFormProps = {};

export function ResetPasswordForm({}: ResetPasswordFormProps) {
  const form = useForm<z.infer<typeof newPassword>>({
    defaultValues: {
      otp: undefined,
    },
    resolver: zodResolver(newPassword),
  });

  //* Hanlder function
  const formSubmitHandler = (values: z.infer<typeof newPassword>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-sm flex-col items-center gap-4 self-center"
        onSubmit={form.handleSubmit((values) => formSubmitHandler(values))}
      >
        {/*//* Email input field  */}
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="on"
                  className="text-center"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*//* Submit button  */}
        <Button
          type="submit"
          className="w-full"
        >
          Send Verification Code
        </Button>
      </form>
    </Form>
  );
}
