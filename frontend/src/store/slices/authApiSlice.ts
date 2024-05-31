import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../../utils/constants";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<Auth, RegisterUser>({
      query: (crendentials) => ({
        url: USERS_URL,
        method: "POST",
        body: crendentials,
        credentials: "include",
      }),
    }),
    login: builder.mutation<Auth, LoginUser>({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApiSlice;
