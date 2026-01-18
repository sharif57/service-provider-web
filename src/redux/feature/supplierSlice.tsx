"use client";

import baseApi from "../Api/baseApi";

export const supplierApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    allSupplier: builder.query({
      query: () => ({
        url: "/supplychain/suppliers/",
        method: "GET",
      }),
      providesTags: ["Supplier"],
    }),

    // /supplychain/suppliers/
    createSupplier: builder.mutation({
      query: (data) => ({
        url: "/supplychain/suppliers/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Supplier"],
    }),

    deleteSupplier: builder.mutation({
      query: (id) => ({
        // /supplychain/suppliers/1/update/
        url: `/supplychain/suppliers/${id}/update/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Supplier"],
    }),

    


  }),
});

export const { useAllSupplierQuery, useCreateSupplierMutation, useDeleteSupplierMutation } = supplierApi;
