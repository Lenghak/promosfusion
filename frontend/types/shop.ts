import { type Campaign } from "@/types/campaign";
import { type Member } from "@/types/member";

export type Shops = {
  data: Shop[];
  links: ShopsLinks;
  meta: Meta;
};

export type Shop = {
  id: number;
  createdAt: string;
  updatedAt: string;
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
  currentPage: number;
  from: number;
  lastPage: number;
  links: ShopMetaLink[];
  path: string;
  perPage: number;
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
  userIds: string[] | number[];
};

export type DismissShopData = AssignShopData;
