import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./auth";
import { userSlice } from "./user";

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
