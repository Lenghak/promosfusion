import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const getStatusBadgeColor = (status: string) => {
  // Customize badge color based on the status value
  if (status === "Active") {
    return "green";
  } else if (status === "Inactive") {
    return "gray";
  } else if (status === "Pending") {
    return "yellow";
  } else {
    return "default";
  }
};

const CampaignDetailsCard = () => {
  return (
    <Card>
      <CardContent className="grid grid-cols-2 grid-flow-row py-4 px-6">
        <div className="grid grid-flow-row">
          <div className="grid grid-cols-2 grid-flow-col">
            <div>ID</div>
            <div>ID Data</div>
          </div>
          <div className="grid grid-cols-2 grid-flow-col">
            <div>Name</div>
            <div>Name Data</div>
          </div>
          <div className="grid grid-cols-2 grid-flow-col">
            <div>Description</div>
            <div>Description Data</div>
          </div>
          <div className="grid grid-cols-2 grid-flow-col">
            <div>Coupon</div>
            <div>Coupon Data</div>
          </div>
          <div className="grid grid-cols-2 grid-flow-col">
            <div>Created At</div>
            <div>Create Date Data</div>
          </div>
        </div>
        <div className="grid grid-flow-row">
          <div className="grid grid-cols-2 grid-flow-col">
            <div>Created By</div>
            <div>Created By Data</div>
          </div>
          <div className="grid grid-cols-2 grid-flow-col">
            <div>Valid From</div>
            <div>Valid From Data</div>
          </div>
          <div className="grid grid-cols-2 grid-flow-col">
            <div>Expires At</div>
            <div>Expires At Data</div>
          </div>
          <div className="grid grid-cols-2 grid-flow-col">
            <div>Last Updated At</div>
            <div>Last Updated At Data</div>
          </div>
          <div className="grid grid-cols-2 grid-flow-col">
            <div>Status</div>
            <div>
              <Badge>Staus Data and Color</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { CampaignDetailsCard };
