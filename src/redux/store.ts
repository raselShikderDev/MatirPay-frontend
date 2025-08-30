import { configureStore } from '@reduxjs/toolkit'
import { matirPay } from './baseApi'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [matirPay.reducerPath]: matirPay.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(matirPay.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
