import { Fragment } from "react";

import Link from "next/link";

import { MemberDeleteForm } from "@/components/modules/member";
import { MemberUpdateForm } from "@/components/modules/member/member-update-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDialogStore } from "@/lib/zustand";

import { useDeleteMemberService } from "@/services/member";

import { useHandleDeleteEffect } from "@/hooks/member/use-handle-effect";
import { usePermission } from "@/hooks/member/use-permission";
import { CellContext } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Member } from "@/types/member";

const MemberTableActionCell = (cell: CellContext<Member, unknown>) => {
  const { openDialog } = useDialogStore();

  const { isError: isMemberDeleteError, isSuccess: isMemberDeleted } =
    useDeleteMemberService();

  const permission = usePermission();

  useHandleDeleteEffect(isMemberDeleteError, isMemberDeleted);

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(cell.row.original.email)
            }
          >
            Copy Email
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {/* Assigning Member */}
          {permission(cell.row.original) && (
            <DropdownMenuItem>Assigns to Shop</DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link href={`/members/${cell.row.original.id}`}>View Member</Link>
          </DropdownMenuItem>
          {permission(cell.row.original) ? (
            <DropdownMenuItem
              onClick={() =>
                openDialog(true, `member-update-dialog-${cell.row.original.id}`)
              }
            >
              Update Member
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem disabled>Update Member</DropdownMenuItem>
          )}
          <DropdownMenuSeparator />

          {/* Delete Member */}
          {permission(cell.row.original) ? (
            <DropdownMenuItem
              className="font-medium text-destructive"
              onClick={() =>
                openDialog(true, `member-delete-dialog-${cell.row.original.id}`)
              }
            >
              Delete Member
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="font-medium text-destructive"
              disabled
            >
              Delete Member
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {permission(cell.row.original) && (
        <Fragment>
          <MemberUpdateForm
            member={cell.row.original as Member}
            dialogID={`member-update-dialog-${cell.row.original.id}`}
          />
          <MemberDeleteForm
            memberId={`${cell.row.original.id}`}
            manual
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export { MemberTableActionCell };
