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
import { Textarea } from "@/components/ui/textarea";

import { useDialogStore } from "@/lib/zustand";

import { useUpdateShopService } from "@/services/shop";

import { useHandleUpdatedEffect } from "@/hooks/shop/use-handle-effect";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import z from "zod";

import { Shop } from "@/types/shop";

type ShopUpdateFormProps = {
  shop: Shop;
  dialogTrigger?: React.ReactNode;
  dialogID: string;
};

const shopUpdateSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  logo: z.string().optional(),
  description: z.string().optional(),
});

const ShopUpdateForm = ({
  shop,
  dialogTrigger,
  dialogID,
}: ShopUpdateFormProps) => {
  const openAlert = useDialogStore((state) => state.openAlert);

  const form = useForm<z.infer<typeof shopUpdateSchema>>({
    resolver: zodResolver(shopUpdateSchema),
    defaultValues: {
      name: shop.name,
      logo: shop.logo,
      description: shop.description,
    },
    shouldUnregister: true,
  });

  const {
    mutate: updateShop,
    isLoading: isUpdatingShop,
    isSuccess: isShopUpdated,
    isError: isShopUpdatedError,
  } = useUpdateShopService();

  useHandleUpdatedEffect(isShopUpdatedError, isShopUpdated, dialogID);

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
            (values: z.infer<typeof shopUpdateSchema>) =>
              updateShop({ shopId: `${shop.id}`, data: values })
          )}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Shop Name</FormLabel>
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
                <FormLabel>Image URL</FormLabel>
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
              onClick={() => openAlert(true, dialogID)}
            >
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Form>

      {isUpdatingShop ? (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-background">
          <Loader2
            size={24}
            className="animate-spin"
          />
          <span>Updating Shop...</span>
        </div>
      ) : null}
    </DialogWithAlert>
  );
};

export { ShopUpdateForm };
