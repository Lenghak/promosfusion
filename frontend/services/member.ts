import {
  useCreateMember,
  useDeleteMember,
  useGetMember,
  useGetMembers,
  useUpdateMember,
} from "@/lib/axios/member";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { CreateMemberData, Member } from "@/types/member";

const useCreateMemberService = () => {
  const createMember = useCreateMember();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["member-create"],
    mutationFn: async (member: CreateMemberData) => await createMember(member),
    onSettled: () => {
      queryClient.invalidateQueries(["members"]);
    },
  });
};

const useGetMembersService = () => {
  const { data: session } = useSession();
  const getMembers = useGetMembers();

  return useQuery({
    queryKey: ["members"],
    queryFn: async () => (await getMembers()).data,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    enabled: !!session,
  });
};

const useGetMemberService = (id: string) => {
  const { data: session } = useSession();
  const getMember = useGetMember();

  return useQuery({
    queryKey: ["member", id],
    queryFn: async () => await getMember(id),
    enabled: !!session,
  });
};

const useUpdateMemberService = () => {
  const updateMember = useUpdateMember();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["member-update"],
    mutationFn: async (member: Member) => await updateMember(member),
    onSettled: () => {
      queryClient.invalidateQueries(["members"]);
    },
  });
};

const useDeleteMemberService = () => {
  const deleteMember = useDeleteMember();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["member-delete"],
    mutationFn: async (id: string) => await deleteMember(id),
    onSettled: () => {
      queryClient.invalidateQueries(["members"]);
    },
  });
};

export {
  useCreateMemberService,
  useGetMembersService,
  useGetMemberService,
  useUpdateMemberService,
  useDeleteMemberService,
};
