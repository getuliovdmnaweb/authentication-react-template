import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3000";
const LOGIN_URL = `${BASE_URL}/auth/login`;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: LOGIN_URL,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = apiSlice;
