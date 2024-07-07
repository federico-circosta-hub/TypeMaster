import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { retrieveToken } from "../utils/Token";

export const scoreApi = createApi({
  reducerPath: "scoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api`,
  }),
  tagTypes: ["scores"],
  endpoints: (builder) => ({
    getPersonalScore: builder.query({
      query: () => ({
        url: `/personalScore`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${retrieveToken()}`,
        },
      }),
      providesTags: ["scores"],
    }),
    createScore: builder.mutation({
      query: (body) => ({
        url: `/personalScore`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${retrieveToken()}`,
        },
        body: body,
      }),
      invalidatesTags: ["scores"],
    }),
    getGlobalScore: builder.query({
      query: () => ({
        url: `/highestScore`,
        method: "GET",
      }),
      providesTags: ["scores"],
    }),
  }),
});

export const {
  useCreateScoreMutation,
  useGetPersonalScoreQuery,
  useGetGlobalScoreQuery,
} = scoreApi;
