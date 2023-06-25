export type CouponProvideResponse = {
  message: string;
  data: CouponProvideData;
};

export type CouponProvideData = {
  id: number;
  currentStatus: string;
  cuid: string;
  description: any;
  createdBy: number;
  updatedBy: number;
  campaign_id: number;
  belongTo: any;
  createdAt: string;
  updatedAt: string;
  couponDisplay: CouponDisplay;
};

export type CouponDisplay = {
  id: number;
  logo: string;
  campany: string;
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
