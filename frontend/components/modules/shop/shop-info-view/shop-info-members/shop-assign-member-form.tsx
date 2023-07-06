"use client";

import { useForm } from "react-hook-form";

import { AvatarCard } from "@/components/modules/avatar-card";
import { DialogWithAlert } from "@/components/modules/dialog-with-alert";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/select/multi-select";

import { useDialogStore } from "@/lib/zustand";

import { useGetMembersService } from "@/services/member";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import z from "zod";

type ShopAssignFormProps = {
  dialogTrigger?: React.ReactNode;
  dialogID: string;
  shopId: string;
};

const ShopAssignSchema = z.object({
  memberIds: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

const ShopAssignForm = ({
  dialogTrigger,
  dialogID,
  shopId,
}: ShopAssignFormProps) => {
  const openAlert = useDialogStore((state) => state.openAlert);

  const { data: members } = useGetMembersService();

  const form = useForm<z.infer<typeof ShopAssignSchema>>({
    resolver: zodResolver(ShopAssignSchema),
    defaultValues: {
      memberIds:
        members?.data.reduce((acc: string[], current) => {
          if (current.shopIds.includes(parseInt(shopId)))
            acc.push(`${current.id}`);

          return acc;
        }, []) ?? [],
    },
    shouldUnregister: true,
  });

  return (
    <DialogWithAlert
      id={dialogID}
      dialogTrigger={
        dialogTrigger ?? (
          <DialogTrigger
            className="p-2"
            asChild
          >
            <Button className="w-fit gap-4 px-3 lg:px-4">
              <UserPlus size={18} />
              <span className="hidden lg:inline-block">Add Member</span>
            </Button>
          </DialogTrigger>
        )
      }
      dialogTitle={"Assign a Member to Shop"}
      dialogDescription={"Select a shop from the list to assign"}
      alertTitle={"Are you absolutely sure?"}
      alertDescription={
        "You are about to close this dialog. All your changes will be unsaved."
      }
    >
      {members?.data ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => console.log(values))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name={"memberIds"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultiSelect
                      onChange={(values) => {
                        field.onChange(values.map(({ value }) => value));
                      }}
                      data={members.data.map((member) => ({
                        label: (
                          <AvatarCard
                            info={member.email}
                            name={member.name}
                            image={member.avatar}
                          />
                        ),
                        value: `${member.id}`,
                        badge: member.name,
                      }))}
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
      ) : (
        <div>There are no member found.</div>
      )}
    </DialogWithAlert>
  );
};

export { ShopAssignForm };
