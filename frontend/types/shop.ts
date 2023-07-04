import { Campaign } from "@/types/campaign";
import { Member } from "@/types/member";

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
  description: string;
  logo: string;
  deleted_at: string;
  users: Member[];
  campaigns: Campaign[];
};

export type ShopsLinks = {
  first: string;
  last: string;
  prev: string;
  next: string;
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

export type CreateShopData = {
  name: string;
  logo?: string;
  description?: string;
};

export type UpdateShopData = CreateShopData;

export type AssignShopData = {
  shopId: string | number;
  userId: string | number;
};

export type DismissShopData = AssignShopData;
