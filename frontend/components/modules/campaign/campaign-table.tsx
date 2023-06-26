"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import { getCampaigns } from "@/lib/axios/campaign";
import { getQueryClient } from "@/lib/react-query";

import { useGetCampaignsService } from "@/services/campaign";

import { dehydrate, Hydrate, useQueryClient } from "@tanstack/react-query";
import { Edit, MoreVertical } from "lucide-react";
import { useSession } from "next-auth/react";

import { columns } from "./campaign-table-columns";

type CampaignTableProps = {
  id?: number;
  name?: string;
  description?: string;
  createdCoupon?: number;
  creatableCoupon?: number;
  type?: string;
  createdDate?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
};

const CampaignTable = ({}: CampaignTableProps) => {
  const {
    data: campaigns,
    isError: isGetCampaignsError,
    isLoading: isGettingCampaigns,
    isFetching: isFetchingCampaigns,
  } = useGetCampaignsService();

  console.log(campaigns?.data);

  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        data={campaigns?.data || []}
      />
    </div>
  );
};

export { CampaignTable };

// const CampaignTable = () => {
//   const { data: tableData, setData } = useCampaignTableStore();

//   const { data, isLoading, isError } = useQuery(["data"], fetchData, {
//     onSuccess: (data) => {
//       setData(data);
//     },
//   });

//   if (isError) {
//     return <div>Error fetching data</div>;
//   }

//   return (
//     <div className="p-4">
//       <Table>
//         <TableCaption>A list of all of your Campaigns.</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="font-bold">No</TableHead>
//             <TableHead className="font-bold">Name</TableHead>
//             <TableHead className="font-bold">Description</TableHead>
//             <TableHead className="font-bold">Coupons</TableHead>
//             <TableHead className="font-bold">Type</TableHead>
//             <TableHead className="font-bold">Created At</TableHead>
//             <TableHead className="font-bold">Valide From</TableHead>
//             <TableHead className="font-bold">Expire At</TableHead>
//             <TableHead className="font-bold">Status</TableHead>
//             <TableHead className="text-center font-bold">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {tableData.map((campaign: any) => (
//             <TableRow key={campaign.id}>
//               <TableCell className="font-bold">{campaign.id}</TableCell>
//               <TableCell className="font-bold">{campaign.name}</TableCell>
//               <TableCell className="font-bold">
//                 {campaign.description}
//               </TableCell>
//               <TableCell className="font-bold">{campaign.creatableCoupon}</TableCell>
//               <TableCell className="font-bold">{campaign.type}</TableCell>
//               <TableCell className="font-bold">{campaign.createdAt}</TableCell>
//               <TableCell className="font-bold">{campaign.startAt}</TableCell>
//               <TableCell className="font-bold">{campaign.endAt}</TableCell>
//               <TableCell className="font-bold">
//                 <Badge variant="outline">{campaign.status}</Badge>
//               </TableCell>
//               <TableCell className="flex flex-row justify-center gap-1">
//                 <div>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                   >
//                     <Edit size={20} />
//                   </Button>
//                 </div>
//                 <div>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                   >
//                     <MoreVertical size={20} />
//                   </Button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export { CampaignTable };
