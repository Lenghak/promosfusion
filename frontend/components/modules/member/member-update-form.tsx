"use client";

import { useForm } from "react-hook-form";

import { DialogWithAlert } from "@/components/modules/dialog-with-alert";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDialogStore } from "@/lib/zustand";

import { useUpdateMemberService } from "@/services/member";

import { useHandleUpdatedEffect } from "@/hooks/member/use-handle-effect";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import z from "zod";

import { Member } from "@/types/member";

type MemberUpdateFormProps = {
  member: Member;
  dialogTrigger?: React.ReactNode;
  dialogID: string;
};

const memberUpdateSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "This is not a valid email address" }),
  password: z
    .string()

    .refine(
      (value) => {
        return value.length === 0 ? true : value.length >= 8;
      },
      { message: "Password must be at least 8 characters." }
    ),
  role: z.enum(["manager", "seller"], {
    required_error: "Please select a role",
    invalid_type_error: "Select either manager or seller",
  }),
});

const MemberUpdateForm = ({
  member,
  dialogTrigger,
  dialogID,
}: MemberUpdateFormProps) => {
  const openAlert = useDialogStore((state) => state.openAlert);

  const form = useForm<z.infer<typeof memberUpdateSchema>>({
    resolver: zodResolver(memberUpdateSchema),
    defaultValues: {
      name: member.name,
      email: member.email,
      role: member.role as "manager" | "seller",
      password: "",
    },
    shouldUnregister: true,
  });

  const {
    mutate: updateMember,
    isPending: isUpdatingMember,
    isSuccess: isMemberUpdated,
    isError: isMemberUpdateError,
  } = useUpdateMemberService();

  useHandleUpdatedEffect(isMemberUpdateError, isMemberUpdated, dialogID);

  return (
    <DialogWithAlert
      id={dialogID}
      dialogTrigger={dialogTrigger}
      dialogTitle={"Updating a Member"}
      dialogDescription={"Edit this form below to update a member"}
      alertTitle={"Are you absolutely sure?"}
      alertDescription={
        "You are about to close this dialog. All your changes will be unsaved."
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            (values: z.infer<typeof memberUpdateSchema>) =>
              updateMember({ memberId: `${member.id}`, data: values })
          )}
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
                    placeholder="New Password"
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
              onClick={() => openAlert(true, dialogID)}
            >
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Form>

      {isUpdatingMember ? (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-background">
          <Loader2
            size={24}
            className="animate-spin"
          />
          <span>Updating Member...</span>
        </div>
      ) : null}
    </DialogWithAlert>
  );
};

export { MemberUpdateForm };
