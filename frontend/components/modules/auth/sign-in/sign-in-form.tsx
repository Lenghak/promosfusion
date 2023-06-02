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
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password has to be at least 8 characters"),
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

        {/*//* Password input field  */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    {...field}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="pr-12"
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

        <section className="flex w-full items-center justify-between">
          {/* <div className="flex items-center space-x-2">
            <Checkbox id="remember-password" />
            <Label htmlFor="remember-password">Remember me</Label>
          </div> */}

          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center justify-center gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Remember me</FormLabel>
              </FormItem>
            )}
          />

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
