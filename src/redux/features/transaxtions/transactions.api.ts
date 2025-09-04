import { baseApi } from "@/redux/baseApi";
import type { IResponse, TransactionDetails } from "@/types";

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // createUser: builder.mutation({
    //   query: (payload) => ({
    //     url: "/users/create-user",
    //     method: "POST",
    //     data: payload,
    //   }),
    // }),
    getMyRecentTransaction: builder.query<TransactionDetails[], null>({
      query: (params) => ({
        url: "/transactions?limit=5",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTION"],
      transformResponse: (response: IResponse<TransactionDetails[]>) =>
        response.data,
    }),
    getMyTransaction: builder.query<IResponse<TransactionDetails[]>,{ type?: string; page?: number }>({
      query: (params) => ({
        url: "/transactions/",
        method: "GET",
        params,
      }),
      providesTags: ["TRANSACTION"],
    }),
  }),
});

export const { useGetMyTransactionQuery, useGetMyRecentTransactionQuery } =
  transactionsApi;
