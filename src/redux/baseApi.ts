// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from './axiosBaseQuery'


// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'matirPayBaseApi',
  baseQuery: axiosBaseQuery(),
  tagTypes:["USER", "TRANSACTION", "USER", "WALLET"],
  endpoints: () => ({}),
  })