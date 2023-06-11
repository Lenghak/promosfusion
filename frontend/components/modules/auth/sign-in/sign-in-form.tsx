"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Key, Mail } from "lucide-react";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must has at least 8 characters"),
  remember: z.boolean().optional().default(false),
});

type SignInFormProps = {};

export function SignInForm({}: SignInFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
    resolver: zodResolver(signInSchema),
  });

  //* Hanlder function
  const formSubmitHandler = (values: z.infer<typeof signInSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        className="flex h-fit w-full max-w-sm flex-col items-center gap-4 self-center"
        onSubmit={form.handleSubmit((values) => formSubmitHandler(values))}
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
                    type="email"
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

        {/*//* Password input field  */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative w-full">
              <FormControl>
                <div className="relative">
                  <Key
                    size={18}
                    className="absolute left-4 h-full text-accent-foreground"
                  />
                  <Input
                    placeholder="Password"
                    {...field}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="px-12"
                    autoComplete="password"
                  />
                  <Button
                    variant={"link"}
                    type="button"
                    className="absolute right-0 top-0 text-neutral-900 dark:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <section className="flex w-full items-center justify-end">
          <Link
            href={"/forgot-password"}
            className={cn([
              buttonVariants({ variant: "link", size: "lg" }),
              "h-fit w-fit p-0 text-right",
            ])}
          >
            Forgot Password?
          </Link>
        </section>

        {/*//* Submit button  */}
        <Button
          type="submit"
          className="w-full"
        >
          Sign In
        </Button>

        {/*//* No account link  */}
        <span className="text-center text-sm">
          Don&apos;t have an account yet?{" "}
          <Link
            href={"/sign-up"}
            className={cn([buttonVariants({ variant: "link" }), "p-0 px-2"])}
          >
            Create One
          </Link>
        </span>
      </form>
    </Form>
  );
}
