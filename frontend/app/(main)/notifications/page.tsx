import { PageTitle } from "@/components/modules/page-title";
import { UnderConstruction } from "@/components/modules/under-construction/under-construction";

export default function Notification() {
  return (
    <div>
      <PageTitle
        title="Chat"
        description="Connected with better communication"
      />
      <UnderConstruction />
    </div>
  );
}
