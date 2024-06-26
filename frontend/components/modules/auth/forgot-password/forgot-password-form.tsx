"use client";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

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
import { Mail } from "lucide-react";
import { z } from "zod";

const resetPassowrdSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export function ForgotPasswordForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPassowrdSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(resetPassowrdSchema),
  });

  //* Hanlder function
  const formSubmitHandler = () => {
    router.push("/reset-password");
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-sm flex-col items-center gap-4 self-center"
        onSubmit={form.handleSubmit(() => formSubmitHandler())}
      >
        {/*//* Email input field  */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 h-full text-accent-foreground"
                  />
                  <Input
                    placeholder="someone@example.com"
                    {...field}
                    autoComplete="on"
                    className="pl-12"
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
