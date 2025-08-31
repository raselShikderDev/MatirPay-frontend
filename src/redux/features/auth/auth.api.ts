import { baseApi } from "@/redux/baseApi";
import type { ILogin, ILogInRespone, IResponse, ISendOtp, IUser } from "@/types";
import type { ISignUp, IVerifyOtp } from "@/types/auth.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<IResponse<IUser>, ISignUp>({
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
    getMe: builder.query<IResponse<IUser>, null>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags:["USER"]
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/auth/log-out",
        method: "POST",
      }),
    }),
    sendVerifyOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (email) => ({
        url: "/otp/send",
        method: "POST",
        data:email,
      }),
    }),
    VerifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (email) => ({
        url: "/otp/verify",
        method: "POST",
        data:email,
      }),
    }),
  }),
});

export const {useLoginMutation, useGetMeQuery, useCreateUserMutation, useSendVerifyOtpMutation, useVerifyOtpMutation, useLogOutMutation } = authApi