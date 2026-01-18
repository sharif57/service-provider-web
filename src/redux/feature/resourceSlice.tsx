"use client";

import baseApi from "../Api/baseApi";

export const resourceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        allResource: builder.query({
            query: () => ({
                url: "/supplychain/resources/",
                method: "GET",
            }),
            providesTags: ["Supplier"],
        }),

        // /supplychain/suppliers/
        createResource: builder.mutation({
            query: (data) => ({
                url: "/supplychain/resources/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Supplier"],
        }),

        deleteResource: builder.mutation({
            query: (id) => ({
                // /supplychain/suppliers/1/update/
                url: `/supplychain/resources/${id}/update/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Supplier"],
        }),

    }),
});

export const { useAllResourceQuery, useCreateResourceMutation , useDeleteResourceMutation } = resourceApi;
