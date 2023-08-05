import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL = "https://user-authentication-server.onrender.com";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://user-authentication-server.onrender.com",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
