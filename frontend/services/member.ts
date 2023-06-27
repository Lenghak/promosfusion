import { useCreateMember, useGetMembers } from "@/lib/axios/member";

import { useMutation, useQuery } from "@tanstack/react-query";

import { CreateMemberData } from "@/types/member";

const useCreateMemberService = (member: CreateMemberData) => {
  const createMember = useCreateMember(member);
  return useMutation({
    mutationKey: ["member-create"],
    mutationFn: async () => await createMember(),
  });
};

const useGetMembersService = () => {
  const getMembers = useGetMembers();
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => (await getMembers()).data,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

export { useCreateMemberService, useGetMembersService };
