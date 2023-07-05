"use client";

import { useForm } from "react-hook-form";

import { DialogWithAlert } from "@/components/modules/dialog-with-alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useGetMembersService } from "@/services/member";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

type ShopAssignFormProps = {
  dialogTrigger?: React.ReactNode;
  dialogID: string;
};

const ShopAssignSchema = z.object({
  memberIds: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

const ShopAssignForm = ({ dialogTrigger, dialogID }: ShopAssignFormProps) => {
  // const openAlert = useDialogStore((state) => state.openAlert);

  const { data: members } = useGetMembersService();

  const form = useForm<z.infer<typeof ShopAssignSchema>>({
    resolver: zodResolver(ShopAssignSchema),
    defaultValues: {
      memberIds: [],
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => console.log(values))}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="memberIds"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Sidebar</FormLabel>
                </div>
                {members?.data.map((member) => (
                  <FormField
                    key={member.id}
                    control={form.control}
                    name="memberIds"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={member.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(`${member.id}`)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, member.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== `${member.id}`
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </DialogWithAlert>
  );
};

export { ShopAssignForm };
