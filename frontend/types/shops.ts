export type Shop = {
  id: string;
  description: string;
  status: "pending" | "processing" | "success" | "failed";
  logo: string;
};
