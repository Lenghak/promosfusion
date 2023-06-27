export type Members = {
  data: Member[];
  links: MembersLink;
  meta: Meta;
};

export type Member = {
  id: number;
  uuid: string;
  name: string;
  phone: string;
  email: string;
  role: "manager" | "seller";
  status: string;
  type: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};

export type MembersLink = {
  first: string;
  last: string;
  prev: string;
  next: string;
};

export type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: MemberMetaLinks[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type MemberMetaLinks = {
  url?: string;
  label: string;
  active: boolean;
};

export type CreateMemberData = {
  name: string;
  email: string;
  role: string;
  password: string;
};
