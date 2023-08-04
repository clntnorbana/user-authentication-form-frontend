import { apiSlice } from "./apiSlice";

const URL = "/api/user";

export const apiUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = apiUserSlice;
