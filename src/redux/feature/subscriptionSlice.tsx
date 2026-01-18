
import baseApi from "../Api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // /subscription/plans/
    subscriptionPlans: builder.query({
      query: () => ({
        url: "/subscription/plans/",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    subscriptionDetails: builder.query({
      query: (id) => ({
        url: `/subscription/plans/${id}/`,
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    // subscription/my/checkout/
    subscriptionCheckout: builder.mutation({
      query: (data) => ({
        url: "/subscription/my/checkout/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

  }),
});

export const { useSubscriptionPlansQuery , useSubscriptionDetailsQuery, useSubscriptionCheckoutMutation } = subscriptionApi;
