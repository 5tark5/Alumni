import { apiSlice } from "./apiSlice.js";
import { INSTITUTE_URL } from "../constants.js";

export const instituteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${INSTITUTE_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${INSTITUTE_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${INSTITUTE_URL}/logout`,
        method: "POST",
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${INSTITUTE_URL}/profile`,
      }),
      providesTags: ["Institute"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${INSTITUTE_URL}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Institute"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = instituteApiSlice;
