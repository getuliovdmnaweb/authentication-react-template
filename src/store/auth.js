import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import jwt from "jwt-decode";
import { setUser } from "./user";

const BASE_URL = "http://localhost:8080";
const LOGIN_URL = `${BASE_URL}/auth/login`;
const SIGNUP_URL = `${BASE_URL}/auth/signup`;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: SIGNUP_URL,
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { token },
          } = await queryFulfilled;
          const { role, name, email } = jwt(token);
          dispatch(
            setUser({
              role,
              name,
              email,
              token,
            })
          );
        } catch (error) {
          console.log("On query started", error);
        }
      },
      query: (credentials) => ({
        url: LOGIN_URL,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = apiSlice;
