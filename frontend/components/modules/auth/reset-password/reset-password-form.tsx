"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Hash } from "lucide-react";
import { z } from "zod";

const newPassword = z.object({
  otp: z.string().length(6, "The verification code must be 6 numbers long"),
});

type ResetPasswordFormProps = {};

export function ResetPasswordForm({}: ResetPasswordFormProps) {
  const form = useForm<z.infer<typeof newPassword>>({
    defaultValues: {
      otp: "",
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
              <FormControl>
                <div className="relative">
                  <Hash
                    size={18}
                    className="absolute left-4 h-full text-accent-foreground"
                  />
                  <Input
                    type="number"
                    placeholder="eg. 123456"
                    autoComplete="on"
                    className="number-appearance-none pl-12"
                    {...field}
                  />
                </div>
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
