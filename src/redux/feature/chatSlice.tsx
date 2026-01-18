"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Replace with your base URL
// const API_URL = "http://10.10.12.111:8001/ai/api";
const API_URL = "http://10.10.12.3:8000";

export const aiApi = createApi({
  reducerPath: "chatApi",
  tagTypes: ["Session"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    generateOffer: builder.mutation({
      query: (data) => ({
        // url: "/offers/generate",
        url: "/offers/chat",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Session"],
    }),

    // /offers/update
    updateGeneratedOffer: builder.mutation({
      query: (data) => ({
        url: "/offers/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Session"],
    }),
    // /offers/?offer_id=8f13e13e-9bba-41e6-9d2d-49959d54e5d6
    getOffer: builder.query({
      query: (offerId) => ({
        url: `/offers/${offerId}`,
        method: "GET",
      }),
      providesTags: ["Session"],
    }),

    // /offers/toggle-status
    toggleOfferStatus: builder.mutation({
      query: (data) => ({
        url: "/offers/toggle-status",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Session"],
    }),

    saveOffer: builder.mutation({
      query: (data) => ({
        // /save/offer?user_id=1234
        url: `/offers/save`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Session"],
    }),
    // /offers/?user_id=11
    userWiseOffer: builder.query({
      query: (id) => ({
        url: `/offers/?user_id=${id} `,
        method: "GET",
      }),
      providesTags: ["Session"],
    }),


    // /email-offer
    customerEmail: builder.mutation({
      query: (data) => ({
        url: "/email-offer",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Session"],
    }),

    // /email-acceptance
    customerAcceptance: builder.mutation({
      query: (data) => ({
        url: "/email-acceptance",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Session"],
    }),

    // /email-custom
    customerCustom: builder.mutation({
      query: (data) => ({
        url: "/email-custom",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Session"],
    }),

    // /send-email
    sendEmail: builder.mutation({
      query: (data) => ({
        url: "/send-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Session"],
    }),

    userAllSessions: builder.query({
      query: (email) => ({
        url: `/user/${email}/sessions`,
        method: "GET",
        // /user/sharifmahamud577951@gmail.com/sessions
      }),
      providesTags: ["Session"],
    }),


    userWiseOfferDate: builder.query({
      query: ({ user_id, start_date, end_date }) => ({
        url: `/offers-date`,
        method: "GET",
        params: { user_id, start_date, end_date },
      }),
      providesTags: ["Session"],
    }),

    // /get-suppliers?user_id=4
    getSupplier: builder.query({
      query: (userId) => ({
        url: `/get-suppliers?user_id=${userId}`,
        method: "GET",
      }),
      providesTags: ["Session"],
    }),
    // /generate-supplier-email
    generateSupplierEmail: builder.mutation({
      query: (data) => ({
        url: "/generate-supplier-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Session"],
    }),
    // /offers/materials-ordered?offer_id=1784a2cb-606e-4f0b-b8fd-3ba3e64ed010
    getMaterialsOrderedUpdated: builder.mutation({
      query: (id) => ({
        url: `/offers/materials-ordered?offer_id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Session"],
    }),

    // /get-resources?user_id=4
    getResource: builder.query({
      query: (userId) => ({
        url: `/get-resources?user_id=${userId}`,
        method: "GET",
      }),
      providesTags: ["Session"],
    }),



  }),
});

export const {
  useGenerateOfferMutation,
  useUpdateGeneratedOfferMutation,
  useGetOfferQuery,
  useToggleOfferStatusMutation,
  useSaveOfferMutation,
  useUserWiseOfferQuery,
  useCustomerEmailMutation,
  useCustomerAcceptanceMutation,
  useCustomerCustomMutation,
  useSendEmailMutation,
  useUserAllSessionsQuery,
  useUserWiseOfferDateQuery,
  useGetSupplierQuery,
  useGenerateSupplierEmailMutation,
  useGetMaterialsOrderedUpdatedMutation,
  useGetResourceQuery
} = aiApi;
