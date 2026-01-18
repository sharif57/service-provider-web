
"use client";
import baseApi from "../Api/baseApi";

export const offerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allOffer: builder.query({
            // today, week, month
            query: ({ status,  period}) => ({
                url: `/supplychain/task/status/?status=${status}&period=${period}`,
                method: "GET",
            }),
            providesTags: ["Supplier"],
        }),
        offerDetails: builder.query({
            query: (id: string) => ({
                url: `/supplychain/tasks/${id}/`,
                method: "GET",
            }),
            providesTags: ["Supplier"],
        })
    }),


});

export const { useAllOfferQuery, useOfferDetailsQuery } = offerApi;