"use client";

import { useCallback, useState } from "react";

import { AvatarCard } from "@/components/modules/avatar-card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useHandleDismissShopEffect } from "@/hooks/member/use-handle-effect";

import { useDismissShopService } from "@/services/shop";

import { Loader2, UserMinus } from "lucide-react";
import { useSession } from "next-auth/react";
import z from "zod";

import { type Member } from "@/types/member";

type ShopDismissMemberProps = {
  selectedMember: Member[];
  shopId: string | number;
};

const ShopDismissSchema = z.object({
  selectedMembers: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "Please select at least a member.",
    }),
});

const ShopDismissMember = ({
  selectedMember,
  shopId,
}: ShopDismissMemberProps) => {
  const {
    mutate: dismissShop,
    isPending: isDismissing,
    isError: isDismissError,
    error: dismissError,
    isSuccess: isDismissSuccess,
  } = useDismissShopService();

  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const { data: session } = useSession();

  const handleDismissMember = useCallback(
    (data: z.infer<typeof ShopDismissSchema>) => {
      session &&
        dismissShop({
          shopId: `${shopId}`,
          data: {
            userIds: data.selectedMembers.filter((member) => {
              return member !== `${session?.user.id}`;
            }),
          },
        });
    },

    [session, dismissShop, shopId],
  );

  useHandleDismissShopEffect(
    isDismissError,
    isDismissSuccess,
    dismissError as Error,
    setAlertOpen,
  );

  return (
    <AlertDialog
      open={alertOpen}
      onOpenChange={(open) => setAlertOpen(open)}
    >
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className={"gap-4"}
        >
          <UserMinus size={18} />
          <span>Dismiss</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will dismiss the selected members from this shop.
          </AlertDialogDescription>

          <div className={"flex w-full flex-col gap-4 p-4"}>
            {selectedMember.map((member) => (
              <div
                key={member.id}
                className={"flex w-full items-center justify-between"}
              >
                <AvatarCard
                  info={member.email}
                  name={member.name}
                  image={member.avatar}
                  className={"overflow-hidden"}
                />

                <span className={"text-sm capitalize text-muted-foreground"}>
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setAlertOpen(false)}>
            Cancel
          </AlertDialogCancel>

          <Button
            onClick={() =>
              handleDismissMember(
                ShopDismissSchema.parse({
                  selectedMembers: selectedMember.map(
                    (member) => `${member.id}`,
                  ),
                }),
              )
            }
            className={"bg-destructive hover:bg-destructive/80"}
          >
            Dismiss
          </Button>
        </AlertDialogFooter>

        {isDismissing ? (
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-background">
            <Loader2
              size={24}
              className="animate-spin"
            />
            <span>Dismissing...</span>
          </div>
        ) : null}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ShopDismissMember };
