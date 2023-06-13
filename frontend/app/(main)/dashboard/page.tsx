import { authOptions } from "@/lib/next-auth";

import { getServerSession } from "next-auth/next";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
