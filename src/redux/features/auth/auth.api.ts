import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (payload) => ({
        url: "/users/create-user",
        method: "POST",
        data: payload,
      }),
    }),
    login: builder.mutation({
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
  }),
});
