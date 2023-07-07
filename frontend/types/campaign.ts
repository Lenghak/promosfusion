import { Coupon, CouponDisplay } from "@/types/coupon";

export interface Campaigns {
  data: Campaign[];
  links: CampaignsLinks;
  meta: CampaignMeta;
}

export interface Campaign {
  id: number | string;
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
  couponDetail: CouponDetailBOGO | CouponDetailPBandPrice;
  coupons: Coupon[];
  couponDisplay: CouponDisplay;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: string;
}

export interface CouponDetailPBandPrice {
  value: number;
}

export interface CouponDetailBOGO {
  buy: number;
  get: number;
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

export type CreateCampaignData = {
  name: string;
  description?: string;
  maxCreatableCoupon: number;
  type: string;
  startAt: string;
  endAt: string;
  couponType: string;
  couponDetail: string;
  shopIds: string[];
};

export type UpdateCampaignData = {
  name: string;
  description?: string;
  maxCreatableCoupon: number;
  startAt: string;
  endAt: string;
};
