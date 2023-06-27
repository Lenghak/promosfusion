// export type Shop = ={
//   id: string;
//   description: string;
//   status: "pending" | "processing" | "success" | "failed";
//   logo: string;
// };

export type Shops = {
  data: Shop[];
  links: ShopsLinks;
  meta: Meta;
};

export type Shop = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: any;
  logo: string;
  deleted_at: any;
};

export type ShopsLinks = {
  first: string;
  last: string;
  prev: any;
  next: any;
};

export type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: ShopMetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type ShopMetaLink = {
  url?: string;
  label: string;
  active: boolean;
};
