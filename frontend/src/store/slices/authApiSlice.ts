import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../../utils/constants";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserInfo, RegisterUser>({
      query: (crendentials) => ({
        url: USERS_URL,
        method: "POST",
        body: crendentials,
        credentials: "include",
      }),
    }),
    login: builder.mutation<UserInfo, LoginUser>({
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
    profile: builder.query<UserInfo, void>({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<UserInfo, UserUpdate>({
      query: (update) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: update,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useProfileQuery,
  useUpdateProfileMutation,
} = authApiSlice;
