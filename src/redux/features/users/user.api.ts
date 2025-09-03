import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    approveAgent: builder.mutation({
      query: (id) => ({
        url: `/users/agent-approve/:${id}`,
        method: "POST",
      }),
    }),
    toggleAgentStatus: builder.mutation({
      query: (id) => ({
        url: `/users/agent-approve/:${id}`,
        method: "POST",
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "/users/all-user",
        method: "GET",
      }),
      providesTags: ["USER"],
    //   transformResponse: (response: IResponse<TransactionDetails[]>) =>
    //     response.data,
    }),
    getSingelUser: builder.query({
      query: (id) => ({
        url: `/users/:${id}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getSingelAgent: builder.query({
      query: (id) => ({
        url: `/users/agents/:${id}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    //   transformResponse: (response: IResponse<TransactionDetails[]>) =>
    //     response.data,
    }),
    getAllAgents: builder.query({
      query: () => ({
        url: "/users/all-agents",
        method: "GET",
      }),
      providesTags: ["USER"],
    //   transformResponse: (response: IResponse<TransactionDetails[]>) =>
    //     response.data,
    }),
    // getMyTransaction: builder.query<IResponse<TransactionDetails[]>,{ type?: string; page?: number }>({
    //   query: (params) => ({
    //     url: "/transactions/",
    //     method: "GET",
    //     params,
    //   }),
    //   providesTags: ["TRANSACTION"],
    // }),
  }),
});

export const { useGetAllUserQuery, useGetAllAgentsQuery, useApproveAgentMutation, useToggleAgentStatusMutation, useGetSingelAgentQuery } =
  userApi;
