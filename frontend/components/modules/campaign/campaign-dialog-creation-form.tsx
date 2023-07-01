import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Plus } from "lucide-react";

export function CampaignDialogCreationForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus />
          <span>Add Campaign</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-2xl">Create Campaign</DialogTitle>
          <DialogDescription className="text-center">
            Please fill in the form below to create your campaign
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right"
            >
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter a campaign name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="maxCoupons"
              className="text-right"
            >
              Maximum Coupons
            </Label>
            <Input
              id="maxCoupons"
              type="number"
              placeholder="16"
              className="col-span-3"
              min={1}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="desc"
              className="text-right"
            >
              Description
            </Label>
            <Input
              id="desc"
              type="text"
              placeholder="Describe about your campaign"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="validFrom"
              className="text-right"
            >
              Start At
            </Label>
            <Input
              id="validFrom"
              type="date"
              placeholder="DD / MM / YYYY"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="expiresAt"
              className="text-right"
            >
              Expires At
            </Label>
            <Input
              id="expiresAt"
              type="date"
              placeholder="DD / MM / YYYY"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
