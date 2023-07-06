"use client";

import { useMemo } from "react";
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
import { useAssignShopService } from "@/services/shop";

import { useHandleAssignShopEffect } from "@/hooks/member/use-handle-effect";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus, UserX } from "lucide-react";
import z from "zod";

import { Members } from "@/types/member";

type ShopAssignFormProps = {
  dialogTrigger?: React.ReactNode;
  dialogID: string;
  shopId: number;
};

const ShopAssignSchema = z.object({
  memberIds: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Please select at least one member.",
  }),
});

const ShopAssignForm = ({
  dialogTrigger,
  dialogID,
  shopId,
}: ShopAssignFormProps) => {
  const openAlert = useDialogStore((state) => state.openAlert);

  const { data: rawMembers } = useGetMembersService();

  const {
    mutate: assignShop,
    isError: isAssignError,
    isLoading: isAssigning,
    isSuccess,
  } = useAssignShopService();

  const members: Members | undefined = useMemo(() => {
    return rawMembers
      ? {
          ...rawMembers,
          data: rawMembers.data.filter(
            (member) => !member.shopIds.includes(shopId)
          ),
        }
      : undefined;
  }, [rawMembers, shopId]);

  const form = useForm<z.infer<typeof ShopAssignSchema>>({
    resolver: zodResolver(ShopAssignSchema),
    defaultValues: {
      memberIds: members?.data.map((member) => `${member.id}`) ?? [],
    },
    shouldUnregister: true,
  });

  useHandleAssignShopEffect(
    isAssignError,
    isSuccess,
    `shop-assign-dialog-${shopId}`
  );

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
      {members?.data.length ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              assignShop({
                shopId: shopId,
                data: { userIds: values.memberIds },
              })
            )}
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
              <Button type="submit">Assign</Button>
            </div>
          </form>
        </Form>
      ) : (
        <div
          className={"flex items-center justify-center gap-4 p-4 text-center"}
        >
          <UserX size={24} />
          <span className={"text-sm text-muted-foreground"}>
            There are no more member to add.
          </span>
        </div>
      )}

      {isAssigning ? (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-background">
          <Loader2
            size={24}
            className="animate-spin"
          />
          <span>Assigning Shop...</span>
        </div>
      ) : null}
    </DialogWithAlert>
  );
};

export { ShopAssignForm };
