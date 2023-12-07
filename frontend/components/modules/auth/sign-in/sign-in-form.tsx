"use client";

import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { useSignInService } from "@/services/auth";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Key, Loader2, Mail } from "lucide-react";
import { z } from "zod";

//* zod schema
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must has at least 8 characters"),
});

type SignInFormProps = {};

export function SignInForm({}: SignInFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { toast } = useToast();

  const { replace } = useRouter();
  //* form return object from useForm from react-hook-form integrated with zod
  const form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const {
    mutate: signIn,
    isPending: isSigningIn,
    data: signInResponse,
  } = useSignInService();

  //* Hanlder function
  const formSubmitHandler = (values: z.infer<typeof signInSchema>) => {
    signIn({
      email: values.email,
      password: values.password,
    });
  };

  //* Signin Error handling
  useEffect(() => {
    if (signInResponse?.error?.includes("401"))
      form.setError("password", {
        message: "Error - Incorrect password",
        type: "401",
      });
    else if (signInResponse?.error?.includes("404"))
      form.setError("email", {
        message: "Error - No user found with this email",
        type: "404",
      });
    else if (signInResponse?.error?.length) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem processing your request. Please try again later",
      });
    }
  }, [signInResponse, form, toast, replace]);

  return (
    <Fragment>
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
            disabled={isSigningIn}
          >
            {isSigningIn ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              "Sign In"
            )}
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

      {isSigningIn || signInResponse?.error === null ? (
        <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 bg-background">
          <Loader2
            size={48}
            className="animate-spin"
          />
          <span>Signing In...</span>
        </div>
      ) : null}
    </Fragment>
  );
}
