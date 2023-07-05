"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { useDialogStore } from "@/lib/zustand";

import { useCreateCampaignService } from "@/services/campaign";

import { useHandleCreateEffect } from "@/hooks/campaign";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Plus } from "lucide-react";
import { z } from "zod";

import { DialogWithAlert } from "../dialog-with-alert";

type CampaignCreateFormProps = {};

const CouponBogoType = z.object({
  buy: z.number(),
  get: z.number(),
});

const PercentNFixedPrice = z.object({
  value: z.number(),
});

const campaignCreateFormSchema = z.object({
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
  type: z.enum(["general", "public", "strict", "share"], {
    required_error: "Select a campaign type",
    invalid_type_error: "Invalid Campaign Type",
  }),
  startAt: z.date({ required_error: "Select valid date of campaign" }),
  endAt: z.date({ required_error: "Select expires date of campaign" }),

  couponType: z.enum(["Percent Based", "Fixed Price", "BOGO"], {
    required_error: "Select a coupons type",
    invalid_type_error: "Invalid coupons type",
  }),

  couponDetail: z.union([CouponBogoType, PercentNFixedPrice]),

  shopIds: z.string({ required_error: "Assign the campaign to shop(s)" }),
});

const CAMPAIGN_CREATE_DIALOG_ID = "campaign-create-dialog-id";

const CampaignCreateForm = ({}: CampaignCreateFormProps) => {
  const form = useForm<z.infer<typeof campaignCreateFormSchema>>({
    resolver: zodResolver(campaignCreateFormSchema),
    defaultValues: {
      name: "",
      description: "",
      maxCreatableCoupon: 1,
      type: "general",
      // couponType: "Percent Based",
    },
    shouldUnregister: true,
  });

  const { openAlert } = useDialogStore((state) => state);

  const {
    mutate: createCampaign,
    isLoading: isCreatingCampaign,
    isError: isCreateCampaignFailed,
    isSuccess: isCampaignCreated,
  } = useCreateCampaignService();

  useHandleCreateEffect(
    isCreateCampaignFailed,
    isCampaignCreated,
    CAMPAIGN_CREATE_DIALOG_ID
  );

  return (
    <DialogWithAlert
      id={CAMPAIGN_CREATE_DIALOG_ID}
      dialogTrigger={
        <DialogTrigger
          className="p-2"
          asChild
        >
          <Button className="w-fit gap-4 px-3 lg:px-4">
            <Plus size={18} />
            <span className="hidden lg:inline-block">Create Campaign</span>
          </Button>
        </DialogTrigger>
      }
      dialogTitle={"Create Campaign"}
      dialogDescription={
        "Please fill in the form below to create your campaign"
      }
      alertTitle={"Are you absolutely sure?"}
      alertDescription={
        "You are about to close this dialog. All your input will be unsaved."
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            (values: z.infer<typeof campaignCreateFormSchema>) =>
              createCampaign({
                ...values,
                startAt: format(values.startAt, "yyyy/MM/dd"),
                endAt: format(values.endAt, "yyyy/MM/dd"),
                shopIds: [values.shopIds],
                couponDetail: JSON.stringify(values.couponDetail),
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

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Campaign Type</FormLabel>
                <FormControl>
                  <Select
                    defaultValue="general"
                    onValueChange={field.onChange}
                    {...field}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="general" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Campaign Type</SelectLabel>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="strict">Strict</SelectItem>
                        <SelectItem value="share">Share</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="couponType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Coupon Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      {...field}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a coupon type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Coupons Type</SelectLabel>
                          <SelectItem value="Percent Based">
                            Percent Based
                          </SelectItem>
                          <SelectItem value="Fixed Price">
                            Fixed Price
                          </SelectItem>
                          <SelectItem value="BOGO">BOGO</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Percentage Field */}
            {(form.watch("couponType") === "Percent Based" ||
              form.watch("couponType") === "Fixed Price") && (
              <FormField
                control={form.control}
                name={"couponDetail.value"}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Coupon Type Detail</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        placeholder={
                          form.watch("couponType") === "Percent Based"
                            ? "Enter a percent"
                            : "Enter a price"
                        }
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
            )}

            {/* BOGO Field */}
            {form.getValues("couponType") === "BOGO" && (
              <div>
                <FormField
                  control={form.control}
                  name={"couponDetail.buy"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Coupon Type Detail</FormLabel>
                      <FormControl>
                        <Input
                          type={"number"}
                          placeholder="20%"
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

                <FormField
                  control={form.control}
                  name={"couponDetail.get"}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Coupon Type Detail</FormLabel>
                      <FormControl>
                        <Input
                          type={"number"}
                          placeholder="20%"
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
            )}
          </div>

          <FormField
            control={form.control}
            name="shopIds"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Shop List</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select shops" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Your Shop List</SelectLabel>
                        {/* Handle Shop Here */}
                        <SelectItem value={`2`}>Percent Based</SelectItem>
                        <SelectItem value={`3`}>Fixed Price</SelectItem>
                        <SelectItem value={`4`}>BOGO</SelectItem>
                        {/* End Here */}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => openAlert(true, CAMPAIGN_CREATE_DIALOG_ID)}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
      {isCreatingCampaign ? (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-background">
          <Loader2
            size={24}
            className="animate-spin"
          />
          <span>Creating Campaign ...</span>
        </div>
      ) : null}
    </DialogWithAlert>
  );
};

export { CampaignCreateForm };
