import { useAxiosAuth } from "@/hooks/use-axios-auth";

import { authorizeAxios } from "./authorize";

import {
  CreatedMemberResponse,
  CreateMemberData,
  Member,
  Members,
  UpdateMemberData,
} from "@/types/member";

//* get members list function for SSR
const getMembers = async () => {
  const authorizedAxios = await authorizeAxios();
  return (await authorizedAxios.get<Members>("/users")).data;
};

//* get individual user by id for SSR
const getMember = async (id: string) => {
  const authorizedAxios = await authorizeAxios();
  return (await authorizedAxios.get<{ data: Member }>(`/users/${id}`)).data;
};

//* get members list function for client side
const useGetMembers = () => {
  const authorizedAxios = useAxiosAuth();
  return async () => authorizedAxios.get<Members>("/users");
};

//* get individual user by id for client side
const useGetMember = () => {
  const authorizedAxios = useAxiosAuth();
  return async (id: string) =>
    authorizedAxios.get<{ data: Member }>(`/users/${id}`);
};

//* create a member
const useCreateMember = () => {
  const authorizedAxios = useAxiosAuth();
  return async (member: CreateMemberData) =>
    authorizedAxios.post<CreatedMemberResponse>("/users", member);
};

//* update an existing member
const useUpdateMember = () => {
  const authorizedAxios = useAxiosAuth();
  return async (memberId: string, data: UpdateMemberData) =>
    authorizedAxios.put(`/users/${memberId}`, data);
};

//* delete an existing member
const useDeleteMember = () => {
  const authorizedAxios = useAxiosAuth();
  return async (id: string) => authorizedAxios.delete(`/users/${id}`);
};

export {
  getMembers,
  getMember,
  useGetMembers,
  useGetMember,
  useCreateMember,
  useUpdateMember,
  useDeleteMember,
};
