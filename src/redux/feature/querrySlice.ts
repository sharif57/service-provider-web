"use client";

import { get } from "http";
import baseApi from "../Api/baseApi";

export const querryApi  = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // submit/querry/
    submitQuerry: builder.mutation({
      query: (data) => ({
        url: "/privacy/thoughts/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Querry"],
    }),

    // submit/querry/
    getQuerry: builder.query({
      query: () => ({
        url: "/privacy/thoughts/",
        method: "GET",
      }),
      providesTags: ["Querry"],
    })




  }),
});

export const { useSubmitQuerryMutation, useGetQuerryQuery  } = querryApi;
