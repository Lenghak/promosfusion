export type CouponResponse = {
  data: Coupon;
};

export type Coupon = {
  id: number;
  currentStatus: string;
  cuid: string;
  token: string;
  description: any;
  createdBy: number;
  updatedBy: number;
  campaign_id: number;
  belongTo: any;
  createdAt: string;
  expiredAt: string;
  updatedAt: string;
  couponDisplay: CouponDisplay;
};

export type CouponDisplay = {
  id: number;
  logo: string;
  company: string;
  title: string;
  description: string;
  name: string;
  promotion: string;
  html: string;
};

export type CouponRequestResponse = {
  message: string;
  data: {
    token: string;
  };
};

export type CouponVerifyResponse = {
  message: string;
};

//* lists
export interface Coupons {
  data: Coupon[];
  links: CouponsPageLinks;
  meta: CouponsMeta;
}

export interface CouponsPageLinks {
  first: string;
  last: string;
  prev: any;
  next: string;
}

export interface CouponsMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: CouponsMetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface CouponsMetaLink {
  url?: string;
  label: string;
  active: boolean;
}
