"use client";

import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

import { UserPlus } from "lucide-react";

import { DialogWithAlert } from "../dialog-with-alert";

type MemberCreateFormProps = {};

const MemberCreateForm = ({}: MemberCreateFormProps) => {
  return (
    <DialogWithAlert
      dialogTrigger={
        <DialogTrigger
          className="p-2"
          asChild
        >
          <Button className="w-fit gap-4 px-4">
            <UserPlus size={18} />
            <span>Add Member</span>
          </Button>
        </DialogTrigger>
      }
      dialogTitle={"Adding a Member"}
      dialogDescription={"Please fill in this form below to add a new member"}
      alertTitle={"Are you absolutely sure?"}
      alertDescription={
        "You are about to close this dialog. All your input will be unsaved."
      }
    ></DialogWithAlert>
  );
};

export { MemberCreateForm };
