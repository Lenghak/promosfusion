import { CouponDisplay } from "@/types/coupon";

export interface Campaigns {
  data: Campaign[];
  links: CampaignsLinks;
  meta: CampaignMeta;
}

export interface Campaign {
  id: number;
  cauid: string;
  name: string;
  description: string;
  isEnabled: number;
  createdCoupon: number;
  creatableCoupon: number;
  maxCreatableCoupon: number;
  startAt: string;
  endAt: string;
  status: string;
  type: string;
  couponType: string;
  couponDetail: CouponDetail;
  couponDisplay: CouponDisplay;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: string;
}

export interface CouponDetail {
  value: number;
}

export interface CampaignsLinks {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface CampaignMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: CampaignMetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface CampaignMetaLink {
  url?: string;
  label: string;
  active: boolean;
}
