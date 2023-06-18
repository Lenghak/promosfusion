"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { redirect } from "next/navigation";

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

import { useToast } from "@/hooks/use-toast";
import { useSignUpService } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Eye, EyeOff, Key, Loader2, Mail, User } from "lucide-react";
import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().nonempty("Enter your full name"),
  email: z.string().email("Invalid email address").nonempty(),
  password: z
    .string()
    .min(8, "Password must has at least 8 characters")
    .nonempty(),
});

type SignUpFormProps = {};

export function SignUpForm({}: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { toast } = useToast();

  const {
    mutate: signUp,
    isError: isSignUpError,
    isSuccess: isSignUpSuccess,
    isLoading: isSigningUp,
    error: signUpError,
  } = useSignUpService();

  const form = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  //* Hanlder function
  const formSubmitHandler = (values: z.infer<typeof signUpSchema>) => {
    signUp(values);
  };

  //* Handling side-effect
  useEffect(() => {
    if (isSignUpSuccess) {
      toast({
        title: "Account Registered Successfully",
        description: "Let's try to sign in using your email.",
      });
      redirect("/sign-in");
    }

    if (isAxiosError(signUpError)) {
      const emailError: string = signUpError.response?.data.errors.email;

      emailError
        ? form.setError("email", { message: emailError })
        : toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              "There was a problem processing your request. Please try again later",
          });
    }
  }, [isSignUpSuccess, signUpError, form, toast]);

  return (
    <Form {...form}>
      <form
        className="flex h-fit w-full max-w-sm flex-col items-center gap-4 self-center"
        onSubmit={form.handleSubmit((values) => formSubmitHandler(values))}
      >
        {/*//* Name input field  */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 h-full text-accent-foreground"
                  />
                  <Input
                    placeholder="Your name"
                    {...field}
                    id="name"
                    className="pl-12"
                    autoComplete="username"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {/* <section className="flex w-full items-center justify-between">

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
        </section> */}

        {/*//* Submit button  */}
        <Button
          type="submit"
          className="w-full"
          disabled={isSigningUp}
        >
          {isSigningUp ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            "Sign Up"
          )}
        </Button>

        {/*//* No account link  */}
        <span className="text-center text-sm ">
          Already have an account?{" "}
          <Link
            href={"/sign-in"}
            className={cn([buttonVariants({ variant: "link" }), "p-0 px-2"])}
          >
            Sign In
          </Link>
        </span>
      </form>
    </Form>
  );
}
