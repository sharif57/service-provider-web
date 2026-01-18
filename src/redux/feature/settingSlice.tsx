import baseApi from "../Api/baseApi";

const settingSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // -------- Terms and Conditions --------
    getTermsAndConditions: builder.query({
      query: () => ({
        url: `/privacy/terms-conditions/`,
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),
    getAboutUs: builder.query({
      query: () => ({
        url: `/privacy/about-us/`,
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),
    // -------- Privacy Policy --------
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: `/privacy/privacy-policy/`,
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),

    // -------- Trust & Safety --------
    getTrustAndSafety: builder.query({
      query: () => ({
        url: `/discipline/trust-safety/`,
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),

  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useGetAboutUsQuery,
  useGetPrivacyPolicyQuery,
  useGetTrustAndSafetyQuery,
} = settingSlice;
