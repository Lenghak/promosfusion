"use client";

import { useForm } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";

import { useDialogStore } from "@/lib/zustand";

import { useCreateShopService } from "@/services/shop";

import { useHandleCreateEffect } from "@/hooks/shop";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import z from "zod";

import { DialogWithAlert } from "../dialog-with-alert";

type ShopCreateFormProps = {};

const shopCreateFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  logo: z.string().optional(),
  description: z
    .string({ required_error: "Describe something about your shop" })
    .min(5, "Enter at least 5 characters."),
});

const SHOP_CREATE_DIALOG_ID = "shop-create-dialog-id";

const ShopCreateForm = ({}: ShopCreateFormProps) => {
  const form = useForm<z.infer<typeof shopCreateFormSchema>>({
    resolver: zodResolver(shopCreateFormSchema),
    defaultValues: {
      name: "",
      logo: "",
      description: "",
    },
    shouldUnregister: true,
  });

  const { openAlert } = useDialogStore((state) => state);

  const {
    mutate: createShop,
    isPending: isCreatingShop,
    isError: isCreateShopFailed,
    isSuccess: isShopCreated,
  } = useCreateShopService();

  useHandleCreateEffect(
    isCreateShopFailed,
    isShopCreated,
    SHOP_CREATE_DIALOG_ID
  );

  return (
    <DialogWithAlert
      id={SHOP_CREATE_DIALOG_ID}
      dialogTrigger={
        <DialogTrigger
          className="p-2"
          asChild
        >
          <Button className="w-fit gap-4 px-3 lg:px-4">
            <Plus size={18} />
            <span className="hidden lg:inline-block">Add Shop</span>
          </Button>
        </DialogTrigger>
      }
      dialogTitle={"Creating a Shop"}
      dialogDescription={"Please fill in this form below to create a new shop"}
      alertTitle={"Are you absolutely sure?"}
      alertDescription={
        "You are about to close this dialog. All your input will be unsaved."
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            (values: z.infer<typeof shopCreateFormSchema>) => createShop(values)
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
                    placeholder="Enter shop name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Logo URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Image URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your shop"
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
              onClick={() => openAlert(true, SHOP_CREATE_DIALOG_ID)}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>

      {isCreatingShop ? (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-background">
          <Loader2
            size={24}
            className="animate-spin"
          />
          <span>Creating Shop ...</span>
        </div>
      ) : null}
    </DialogWithAlert>
  );
};

export { ShopCreateForm };
