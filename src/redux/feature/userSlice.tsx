"use client";

import baseApi from "../Api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => ({
        url: "/account/update-profile/",
        method: "GET",
      }),

      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/account/update-profile/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // /account/stats/
    userStats: builder.query({
      query: () => ({
        url: "/account/stats/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

  }),
});

export const { useUserProfileQuery, useUpdateProfileMutation , useUserStatsQuery } = userApi;
