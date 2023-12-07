"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { useDialogStore } from "@/lib/zustand";

import { useUpdateCampaignService } from "@/services/campaign";

import { useHandleUpdatedEffect } from "@/hooks/campaign/use-handle-effect";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { z } from "zod";

import { DialogWithAlert } from "../dialog-with-alert";

import { Campaign } from "@/types/campaign";

type CampaignUpdateFormProps = {
  campaign: Campaign;
  dialogTrigger?: React.ReactNode;
  dialogID: string;
};

const campaignUpdateFormSchema = z.object({
  name: z.string({ required_error: "Name your campaign" }).min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z
    .string({ required_error: "Describe something about your shop" })
    .min(3, "Enter at least 3 characters."),
  maxCreatableCoupon: z
    .number({ required_error: "Input amount of coupon for the campaign" })
    .refine(
      (value) => value > 0,
      "Max creatable coupon must be greater than 0"
    ),
  startAt: z.date({ required_error: "Select valid date of campaign" }),
  endAt: z.date({ required_error: "Select expires date of campaign" }),
});

const CampaignUpdateForm = ({
  campaign,
  dialogTrigger,
  dialogID,
}: CampaignUpdateFormProps) => {
  const form = useForm<z.infer<typeof campaignUpdateFormSchema>>({
    resolver: zodResolver(campaignUpdateFormSchema),
    defaultValues: {
      name: campaign.name,
      maxCreatableCoupon: campaign.maxCreatableCoupon,
      description: campaign.description,
      startAt: new Date(campaign.startAt),
      endAt: new Date(campaign.endAt),
    },
    shouldUnregister: true,
  });

  const openAlert = useDialogStore((state) => state.openAlert);

  const {
    mutate: updateCampaign,
    isPending: isUpdatingCampaign,
    isSuccess: isCampaignUpdated,
    isError: isCampaignUpdatedError,
  } = useUpdateCampaignService();

  useHandleUpdatedEffect(isCampaignUpdatedError, isCampaignUpdated, dialogID);

  return (
    <DialogWithAlert
      id={dialogID}
      dialogTrigger={dialogTrigger}
      dialogTitle={"Updating a Campaign"}
      dialogDescription={"Edit this form below to update the campaign"}
      alertTitle={"Are you absolutely sure?"}
      alertDescription={
        "You are about to close this dialog. All your changes will be unsaved."
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            (values: z.infer<typeof campaignUpdateFormSchema>) =>
              updateCampaign({
                campaignId: `${campaign.id}`,
                data: {
                  ...values,
                  startAt: format(values.startAt, "yyyy/MM/dd"),
                  endAt: format(values.endAt, "yyyy/MM/dd"),
                },
              })
          )}
          className="flex flex-col space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter campaign name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxCreatableCoupon"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Max Coupon</FormLabel>
                  <FormControl>
                    <Input
                      type={"number"}
                      placeholder="16"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your campaign"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="startAt"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endAt"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Expires Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => openAlert(true, dialogID)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
      {isUpdatingCampaign ? (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-background">
          <Loader2
            size={24}
            className="animate-spin"
          />
          <span>Updating Campaign ...</span>
        </div>
      ) : null}
    </DialogWithAlert>
  );
};

export { CampaignUpdateForm };
