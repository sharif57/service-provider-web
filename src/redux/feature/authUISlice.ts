
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthUIState {
  verifyEmail: string | null;
  token: string | null;
  aiResponse: any | null;
}

const initialState: AuthUIState = {
  verifyEmail: null,
  token: null,
  aiResponse: null,
};

const authUISlice = createSlice({
  name: "authUI",
  initialState,
  reducers: {
    setVerifyEmail: (state, action: PayloadAction<string>) => {
      state.verifyEmail = action.payload;
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    // Store the latest AI response
    aiResponse: (state, action: PayloadAction<any>) => {
      state.aiResponse = action.payload;
    },

    offerResponse: (state, action: PayloadAction<any>) => {
      state.aiResponse = action.payload;
    },

    clearAIResponse: (state) => {
      state.aiResponse = null;
    },

    clearVerifyEmail: (state) => {
      state.verifyEmail = null;
    },
  },
});

export const {
  setVerifyEmail,
  setToken,
  clearVerifyEmail,
  clearAIResponse,
  aiResponse,
  offerResponse
} = authUISlice.actions;

export default authUISlice.reducer;
