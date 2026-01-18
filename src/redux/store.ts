import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./Api/baseApi";
import authUISlice from "./feature/authUISlice";
import { aiApi } from "./feature/chatSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [aiApi.reducerPath]: aiApi.reducer,
    authUI: authUISlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(aiApi.middleware),
});

export default store;
export type AppDispatch = typeof store.dispatch;
