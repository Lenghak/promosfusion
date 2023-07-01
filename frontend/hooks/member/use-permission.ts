import { useSession } from "next-auth/react";

import { Member } from "@/types/member";

const usePermission = () => {
  const { data: session } = useSession();

  return (accessing_user: Member) => {
    //* if the current is not accessing the self && not just reading :
    if (accessing_user.uuid !== session?.user.uuid) {
      switch (session?.user.role) {
        case "root": {
          //* return true if reading other root user info
          return accessing_user.role !== "root";
        }
        case "manager": {
          return accessing_user.role === "seller";
        }
        default: {
          return false;
        }
      }
    } else return true;
    //* if the current is accessing self info -> return true
  };
};

export { usePermission };
