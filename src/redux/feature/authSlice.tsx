"use client";

import baseApi from "../Api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/account/signup/",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/account/login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/account/forget-password/",
        method: "POST",
        body: data,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/account/verify-otp/registration/",
        method: "POST",
        body: data,
      }),
    }),
    forgotVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/account/password/verify-otp/",
        // password/verify-otp/
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/account/resend-otp/",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/account/reset-password/",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("resetToken")}`,
          },
        };
      },
    }),

    updatePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/account/reset-password/",
          method: "POST",
          body: data,
        };
      },
    }),

    googleLogin: builder.mutation({
      query: ({ id_token }) => ({
        url: "/account/social/google/",
        method: "POST",
        body: { id_token: id_token },
      }),
    }),
    // /account/social/microsoft/
    microsoftLogin: builder.mutation({
      query: ({ id_token }) => ({
        url: "/account/social/microsoft/",
        method: "POST",
        body: { id_token: id_token },
      }),
    }),

    // facebookLogin: builder.mutation({
    //   query: ({ access_token }) => ({
    //     url: "/auth/facebookLogin/",
    //     method: "POST",
    //     headers: {
    //       Authorization: `${access_token}`,
    //     },
    //   }),
    // }),
    facebookLogin: builder.mutation({
      query: ({ access_token }) => ({
        url: "/auth/facebookLogin/",
        method: "POST",
        body: {
          access_token: access_token,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useForgotVerifyOtpMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useGoogleLoginMutation,
  useMicrosoftLoginMutation,
  useFacebookLoginMutation,
} = authApi;
