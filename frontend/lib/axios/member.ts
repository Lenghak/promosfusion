import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { authorizeAxios } from "./authorize";

import {
  CreatedMemberResponse,
  CreateMemberData,
  Member,
  Members,
} from "@/types/member";

//* get member function for SSR
const getMembers = async () => {
  const authorizedAxios = await authorizeAxios();
  return (await authorizedAxios.get<Members>("/users")).data;
};

//* get memeber function for client side
const useGetMembers = () => {
  const authorizedAxios = useAxiosAuth();
  return () => authorizedAxios.get<Members>("/users");
};

//* create a member
const useCreateMember = () => {
  const authorizedAxios = useAxiosAuth();
  return (member: CreateMemberData) =>
    authorizedAxios.post<CreatedMemberResponse>("/users", member);
};

//* update an existing member
const useUpdateMember = () => {
  const authorizedAxios = useAxiosAuth();
  return (member: Member) =>
    authorizedAxios.post(`/users/${member.uuid}`, member);
};

export { getMembers, useGetMembers, useCreateMember, useUpdateMember };
