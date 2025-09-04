import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUpdateUser, IUser, TRole } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<IResponse<IUser>, IUpdateUser>({
      query: (payload) => ({
        url: "/users/update-user",
        method: "PATCH",
        data: payload,
      }),
    }),

    getMe: builder.query<IResponse<IUser>, null>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    approveAgent: builder.mutation<IResponse<null>, string>({
      query: (id) => ({
        url: `/users/agent-approve/${id}`,
        method: "PATCH",
      }),
    }),
    suspendAgent: builder.mutation<IResponse<null>, string>({
      query: (id) => ({
        url: `/users/agent-suspend/${id}`,
        method: "PATCH",
      }),
    }),
    toggleAgentStatus: builder.mutation<IResponse<null>, string>({
      query: (id) => ({
        url: `/users/agent-approve/:${id}`,
        method: "POST",
      }),
    }),
    getAllUser: builder.query<IResponse<IUser[]>,{ role?: TRole; page?: number }>({
      query: (params) => ({
        url: "/users/all-user",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),
    getSingelUser: builder.query<IResponse<IUser>, string>({
      query: (id) => ({
        url: `/users/:${id}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getSingelAgent: builder.query<IResponse<IUser>, string>({
      query: (id) => ({
        url: `/users/agents/:${id}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getAllAgents: builder.query<IResponse<IUser[]>, null>({
      query: () => ({
        url: "/users/all-agents",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getApprovedAgentCount: builder.query<IResponse<number>, null>({
      query: () => ({
        url: "/users/all-approved-agents-count",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetAllAgentsQuery,
  useApproveAgentMutation,
  useToggleAgentStatusMutation,
  useGetSingelAgentQuery,
  useGetMeQuery,
  useUpdateUserMutation,
  useGetApprovedAgentCountQuery,
  useSuspendAgentMutation
} = userApi;
