import { useCreateMember, useGetMembers } from "@/lib/axios/member";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { CreateMemberData } from "@/types/member";

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

export { useCreateMemberService, useGetMembersService };
