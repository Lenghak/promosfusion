"use client";

import { useForm } from "react-hook-form";

import Link from "next/link";

import { AvatarCard } from "@/components/modules/avatar-card";
import { DialogWithAlert } from "@/components/modules/dialog-with-alert";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { cn, dateFormat } from "@/lib/utils";
import { useDialogStore } from "@/lib/zustand";

import { useGetShopsService } from "@/services/shop";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Loader2 } from "lucide-react";
import z from "zod";

import { Member } from "@/types/member";

type MemberAssignFormProps = {
  member: Member;
  dialogTrigger?: React.ReactNode;
  dialogID: string;
};

const MemberAssignSchema = z.object({
  shopId: z.number({ required_error: "Please select a shop" }),
});

const MemberAssignForm = ({
  member,
  dialogTrigger,
  dialogID,
}: MemberAssignFormProps) => {
  const openAlert = useDialogStore((state) => state.openAlert);

  const { data: shops, isLoading: isQueryingShop } = useGetShopsService();

  const form = useForm<z.infer<typeof MemberAssignSchema>>({
    resolver: zodResolver(MemberAssignSchema),
    defaultValues: {
      shopId: member.shopIds ? member.shopIds[0] : undefined,
    },
    shouldUnregister: true,
  });

  return (
    <DialogWithAlert
      id={dialogID}
      dialogTrigger={dialogTrigger}
      dialogTitle={"Assign a Member to Shop"}
      dialogDescription={"Select a shop from the list to assign"}
      alertTitle={"Are you absolutely sure?"}
      alertDescription={
        "You are about to close this dialog. All your changes will be unsaved."
      }
    >
      {!isQueryingShop ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              (values: z.infer<typeof MemberAssignSchema>) =>
                console.log({
                  userId: member.id,
                  shopId: values.shopId,
                })
            )}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="shopId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <span
                      className={cn(
                        "pointer-events-auto w-full justify-between",
                        !field.value && "text-muted-foreground",
                        buttonVariants({ variant: "outline" })
                      )}
                    >
                      {field.value
                        ? shops?.data.find((shop) => shop.id === field.value)
                            ?.name
                        : "Select a shop"}
                    </span>
                  </FormControl>

                  <Command className={"w-full border"}>
                    <CommandInput
                      placeholder="Search shop..."
                      className="h-9"
                    />
                    <CommandEmpty>
                      <span>
                        No Shop Found.{" "}
                        <Link
                          href={"/shops"}
                          className={buttonVariants({
                            variant: "link",
                            className: "p-0",
                          })}
                        >
                          Create Shops {`>`}
                        </Link>
                      </span>
                    </CommandEmpty>
                    <CommandGroup className={"w-full"}>
                      {shops?.data.map((shop) => (
                        <CommandItem
                          value={`${shop.name}`}
                          key={shop.id}
                          onSelect={() => {
                            form.setValue("shopId", shop.id);
                          }}
                        >
                          <AvatarCard
                            name={shop.name}
                            image={shop.logo}
                            info={dateFormat(shop.createdAt)}
                          />
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              shop.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>

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
          className={
            "flex h-full w-full flex-col items-center justify-center gap-4"
          }
        >
          <Loader2
            size={24}
            className={"animate-spin"}
          />
          <span>Getting Shops...</span>
        </div>
      )}
    </DialogWithAlert>
  );
};

export { MemberAssignForm };
