
import baseApi from "../Api/baseApi";

export const queryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    createQuery: builder.mutation({
      query: (data) => ({
        url: "/privacy/submit/querry/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Querry"],
    }),


  }),
});

export const { useCreateQueryMutation } = queryApi;
