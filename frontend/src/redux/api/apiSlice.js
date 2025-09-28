import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants.js";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', 
});
export const apiSlice = createApi({
  baseQuery,
  // Define the types of data you'll be fetching.
  // This is used for cache invalidation.
  tagTypes: ["Institute", "Alumni", "User", "Recruiter"],
  // Endpoints are injected from other files, so this is empty here.
  endpoints: () => ({}),
});
