import { baseApi } from "@/redux/baseApi";
import type { ILogin, ILogInRespone, IResponse, ISendOtp, IUser } from "@/types";
import type { IForgetPassword, IResetPassword, ISignUp, IUpdatePassword, IVerifyOtp } from "@/types/auth.type";

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
    changePassword: builder.mutation<IResponse<null>, IUpdatePassword>({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "PATCH",
        data:payload,
      }),
    }),
    resetPassword: builder.mutation<IResponse<null>, {payload:IResetPassword, resetToken:string}>({
      query: ({payload, resetToken}) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        data:payload,
        headers:{
          Authorization:resetToken,
        }
      }),
    }),
    forgetPassword: builder.mutation<IResponse<null>, IForgetPassword>({
      query: (payload) => ({
        url: `/auth/forget-password`,
        method: "PATCH",
        data:payload,
      }),
    }),
  }),
});

export const {useLoginMutation, useCreateUserMutation, useSendVerifyOtpMutation, useVerifyOtpMutation, useLogOutMutation, useChangePasswordMutation, useResetPasswordMutation, useForgetPasswordMutation } = authApi