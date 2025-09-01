import { baseApi } from "@/redux/baseApi";

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
    // getMyTransaction: builder.query({
    //   query: (params) => ({
    //     url: "/transactions/",
    //     method: "GET",
    //     params,
    //   }),
    //   providesTags:["TRANSACTION"]
    // }),
  }),
});

export const { useUserSendMoneyMutation, useUserCashOutMutation } = walletApi