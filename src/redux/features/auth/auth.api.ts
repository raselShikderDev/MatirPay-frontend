import { baseApi } from "@/redux/baseApi";
import type { ILogin, ILogInRespone, IResponse } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (payload) => ({
        url: "/users/create-user",
        method: "POST",
        data: payload,
      }),
    }),
    login: builder.mutation<IResponse<ILogInRespone>, ILogin>({
      query: (payload) => ({
        url: "/auth/sign-in",
        method: "POST",
        data: payload,
      })
    }),
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags:["USER"]
    }),
    loggedOut: builder.mutation({
      query: () => ({
        url: "/auth/log-out",
        method: "POST",
      }),
    }),
    sendVerifyOtp: builder.mutation({
      query: (email) => ({
        url: "/otp/send",
        method: "POST",
        data:email,
      }),
    }),
    VerifyOtp: builder.mutation({
      query: (email) => ({
        url: "/otp/verify",
        method: "POST",
        data:email,
      }),
    }),
  }),
});

export const {useLoginMutation, useCreateUserMutation, useSendVerifyOtpMutation, useVerifyOtpMutation } = authApi