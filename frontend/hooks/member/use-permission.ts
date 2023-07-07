import { useSession } from "next-auth/react";
import z from "zod";

const ActionSchema = z.enum(["c", "r", "u", "d"]);

const usePermission = () => {
  const { data: session } = useSession();

  return (
    accessingRole: string,
    accessingUuid: string | number,
    action: z.infer<typeof ActionSchema>
  ) => {
    //* if the current is not accessing the self && not just reading :
    if (accessingUuid !== session?.user.uuid) {
      switch (session?.user.role) {
        case "root": {
          //* return true if reading other root user info
          return true;
        }
        case "manager": {
          return accessingRole === "seller";
        }
        default: {
          return false;
        }
      }
    }
    return action !== "d";
    //* if the current is accessing self info -> return true
  };
};

export { usePermission };
