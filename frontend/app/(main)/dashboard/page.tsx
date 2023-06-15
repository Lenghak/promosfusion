import { getCurrentUser } from "@/lib/next-auth";

export default async function Dashboard() {
  const session = await getCurrentUser();
  return <pre></pre>;
}
