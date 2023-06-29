import {
  useCreateMember,
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
  const getMembers = useGetMembers();
  const { data: session } = useSession();
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => (await getMembers()).data,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
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

export { useCreateMemberService, useGetMembersService, useUpdateMemberService };
