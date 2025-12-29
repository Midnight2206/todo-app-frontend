import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './baseApi'
// import userReducer from '@/features/user/userSlice'

export const store = configureStore({
  reducer: {
    // user: userReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})
window.store = store