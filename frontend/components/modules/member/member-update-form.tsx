"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { DialogWithAlert } from "@/components/modules/dialog-with-alert";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { Loader2 } from "lucide-react";
import * as z from "zod";

type MemberCreateFormProps = {};

const memberFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "This is not a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  role: z.enum(["manager", "seller"], {
    required_error: "Please select a role",
    invalid_type_error: "Select either manager or seller",
  }),
});

const MemberCreateForm = ({}: MemberCreateFormProps) => {
  const [dialogStates, setDialogStates] = useState({
    dialogOpen: false,
    alertOpen: false,
    confirmClose: false,
  });

  const form = useForm<z.infer<typeof memberFormSchema>>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <DialogWithAlert
      dialogState={dialogStates}
      setDialogStates={setDialogStates}
      dialogTrigger={
        <DialogTrigger
          className="p-2"
          asChild
        >
          <Button className="w-fit gap-4 px-3 lg:px-4">
            <UserPlus size={18} />
            <span className="hidden lg:inline-block">Add Member</span>
          </Button>
        </DialogTrigger>
      }
      dialogTitle={"Updating a Member"}
      dialogDescription={"Edit this form below to update a member"}
      alertTitle={"Are you absolutely sure?"}
      alertDescription={
        "You are about to close this dialog. All your changes will be unsaved."
      }
    >
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(
          //   (values: z.infer<typeof memberFormSchema>) => createMember(values)
          // )}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="seller">Seller</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant={"outline"}
              onClick={() =>
                setDialogStates((prev) => ({ ...prev, alertOpen: true }))
              }
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>

      {false ? (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-background">
          <Loader2
            size={24}
            className="animate-spin"
          />
          <span>Creating Member ...</span>
        </div>
      ) : null}
    </DialogWithAlert>
  );
};

export { MemberCreateForm };
