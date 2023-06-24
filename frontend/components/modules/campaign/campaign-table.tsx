import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Edit, MoreVertical } from "lucide-react";

const CampaignTable = () => {
  return (
    <div className="p-4">
      <Table>
        <TableCaption>A list of all of your Campaigns.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">No</TableHead>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Description</TableHead>
            <TableHead className="font-bold">Coupons</TableHead>
            <TableHead className="font-bold">Created At</TableHead>
            <TableHead className="font-bold">Valide From</TableHead>
            <TableHead className="font-bold">Expire At</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="text-center font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-bold">1</TableCell>
            <TableCell className="font-bold">Lorem</TableCell>
            <TableCell className="font-bold">Lorem</TableCell>
            <TableCell className="font-bold">6/16</TableCell>
            <TableCell className="font-bold">01-May-2023</TableCell>
            <TableCell className="font-bold">02-May-2023</TableCell>
            <TableCell className="font-bold">02-May-2023</TableCell>
            <TableCell className="font-bold">
              <Badge variant="outline">Available</Badge>
            </TableCell>
            <TableCell className="flex flex-row justify-center gap-1">
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                >
                  <Edit size={20} />
                </Button>
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                >
                  <MoreVertical size={20} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export { CampaignTable };
