import { authOptions } from "@/lib/next-auth";

import { getServerSession } from "next-auth/next";

const getCurrentUser = async () => {
  return await getServerSession(authOptions);
};

export { getCurrentUser };
