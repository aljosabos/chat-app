import { createSlice } from "@reduxjs/toolkit";

import type { ChatState, Conversation } from "./types";
import type { RootState } from "@/store";
import {
  getConversationMessages,
  getConversations,
  openConversation,
  sendMessage,
} from "./thunks";

const initialState: ChatState = {
  status: undefined,
  error: "",
  conversations: [],
  activeConversation: {} as Conversation,
  messages: [],
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

    /**** GET CONVERSATION MESSAGES  ****/
    builder.addCase(getConversationMessages.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });

    builder.addCase(getConversationMessages.rejected, (state, action) => {
      state.status = "error";
      if (action.payload) {
        state.error = action.payload.error.message;
      } else {
        state.error = action.error.message || "Unknown error";
      }
    });

    builder.addCase(getConversationMessages.fulfilled, (state, action) => {
      state.status = "success";
      state.error = "";
      state.messages = action.payload;
    });

    /**** SEND MESSAGE  ****/
    builder.addCase(sendMessage.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });

    builder.addCase(sendMessage.rejected, (state, action) => {
      state.status = "error";
      if (action.payload) {
        state.error = action.payload.error.message;
      } else {
        state.error = action.error.message || "Unknown error";
      }
    });

    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.status = "success";
      state.error = "";
      state.messages = [...state.messages, action.payload];

      // Message BE response contains the field 'conversation', which is actually a conversation id, not the conversation itself
      const activeConversationId = action.payload.conversation;

      const activeConversationIndex = state.conversations.findIndex(
        (c) => c._id === activeConversationId
      );

      if (activeConversationIndex === -1) return;

      const updatedConversation = {
        ...state.conversations[activeConversationIndex],
        lastMessage: action.payload,
      };
      // remove old stale
      state.conversations.splice(activeConversationIndex, 1);
      // put in the beginning
      state.conversations.unshift(updatedConversation);
    });
  },
});

export const { setActiveConversation } = chatSlice.actions;

export const conversationsSelector = (state: RootState) =>
  state.chat.conversations;

export default chatSlice.reducer;
