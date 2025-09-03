import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUser } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
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
      providesTags:["USER"]
    }),
    // logOut: builder.mutation({
    //   query: () => ({
    //     url: "/auth/log-out",
    //     method: "POST",
    //   }),
    // }),
  }),
});

export const { useGetMeQuery, useUpdateUserMutation } = userApi