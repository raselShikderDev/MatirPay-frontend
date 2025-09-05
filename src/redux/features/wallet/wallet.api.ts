import { baseApi } from "@/redux/baseApi";
import type { IResponse, IWallet } from "@/types";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userSendMoney: builder.mutation({
      query: (payload) => ({
        url: "/wallet/user-send-money",
        method: "POST",
        data: payload,
      }),
    }),
    userCashOut: builder.mutation({
      query: (payload) => ({
        url: "/wallet/user-cash-out",
        method: "POST",
        data: payload,
      }),
    }),
    userCashIn: builder.mutation({
      query: (payload) => ({
        url: "/wallet/user-cash-out",
        method: "POST",
        data: payload,
      }),
    }),
    getMyWallet: builder.query<IResponse<IWallet>, null>({
      query: () => ({
        url: "/wallet/my-wallet",
        method: "GET",
      }),
      providesTags:["WALLET"]
    }),
  }),
});

export const { useUserSendMoneyMutation, useUserCashOutMutation, useUserCashInMutation, useGetMyWalletQuery } = walletApi