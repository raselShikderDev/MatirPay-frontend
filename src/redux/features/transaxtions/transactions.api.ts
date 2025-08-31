import { baseApi } from "@/redux/baseApi";

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // createUser: builder.mutation({
    //   query: (payload) => ({
    //     url: "/users/create-user",
    //     method: "POST",
    //     data: payload,
    //   }),
    // }),
    getMyTransaction: builder.query({
      query: (params) => ({
        url: "/transactions/",
        method: "GET",
        params,
      }),
      providesTags:["TRANSACTION"]
    }),
  }),
});

export const { useGetMyTransactionQuery } = transactionsApi