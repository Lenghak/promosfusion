"use client";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

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

const resetPassowrdSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordFormProps = {};

export function ForgotPasswordForm({}: ForgotPasswordFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPassowrdSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(resetPassowrdSchema),
  });

  //* Hanlder function
  const formSubmitHandler = (values: z.infer<typeof resetPassowrdSchema>) => {
    router.push("/reset-password");
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
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="someone@example.com"
                  {...field}
                  autoComplete="on"
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
