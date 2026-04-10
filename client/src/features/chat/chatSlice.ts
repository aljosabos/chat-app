import { createSlice } from "@reduxjs/toolkit";

import type { ChatState, Conversation } from "./types";
import type { RootState } from "@/store";
import { getConversations, openConversation } from "./thunks";

const initialState: ChatState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {} as Conversation,
  notifications: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getConversations.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });

    builder.addCase(getConversations.rejected, (state, action) => {
      state.status = "error";
      if (action.payload) {
        state.error = action.payload.error.message;
      } else {
        state.error = action.error.message || "Unknown error";
      }
    });

    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.status = "success";
      state.error = "";
      state.conversations =
        action.payload?.conversations || initialState.conversations;
    });

    /**** OPEN CONVERSATION  ****/
    builder.addCase(openConversation.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });

    builder.addCase(openConversation.rejected, (state, action) => {
      state.status = "error";
      if (action.payload) {
        state.error = action.payload.error.message;
      } else {
        state.error = action.error.message || "Unknown error";
      }
    });

    builder.addCase(openConversation.fulfilled, (state, action) => {
      state.status = "success";
      state.error = "";
      state.activeConversation = action.payload;
    });
  },
});

export const { setActiveConversation } = chatSlice.actions;

export const conversationsSelector = (state: RootState) =>
  state.chat.conversations;

export default chatSlice.reducer;
