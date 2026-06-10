import { createSlice } from "@reduxjs/toolkit";

import type { ChatState, Conversation } from "./types";
import type { RootState } from "@/store";
import {
  deleteConversation,
  getConversationMessages,
  getConversations,
  markConversationAsRead,
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
  onlineUsers: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },

    updateMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },

    updateConversationLastMessage: (state, action) => {
      const conversationId = action.payload.conversation;

      const conversation = state.conversations.find(
        (conversation) => conversation._id === conversationId,
      );

      if (conversation) {
        conversation.lastMessage = action.payload;
      }
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    addConversation: (state, action) => {
      const conversation = action.payload;
      const existingConversation = state.conversations.find(
        (c) => c._id === conversation._id
      );

      if (!existingConversation) {
        state.conversations.unshift(conversation);
      }
    },

    updateUnreadCount: (state, action) => {
      const { conversationId, unreadCount } = action.payload;
      const conversation = state.conversations.find(
        (c) => c._id === conversationId
      );
      if (conversation) {
        conversation.unreadCount = unreadCount;
      }
    },
  },
  // **** GET CONVERSATIONS ***//
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

      // Add new conversation to the list if it doesn't already exist
      const existingConversation = state.conversations.find(
        (c) => c._id === action.payload._id
      );

      if (!existingConversation) {
        state.conversations.unshift(action.payload);
      }
    });

    /**** DELETE CONVERSATION  ****/
    builder.addCase(deleteConversation.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });

    builder.addCase(deleteConversation.rejected, (state, action) => {
      state.status = "error";
      if (action.payload) {
        state.error = action.payload.error.message;
      } else {
        state.error = action.error.message || "Unknown error";
      }
    });

    builder.addCase(deleteConversation.fulfilled, (state, action) => {
      state.status = "success";
      state.error = "";
      state.conversations = state.conversations.filter(
        (c) => c._id !== action.payload,
      );
      state.activeConversation = {} as Conversation;
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
        (c) => c._id === activeConversationId,
      );

      if (activeConversationIndex === -1) return;

      const updatedConversation = {
        ...state.conversations[activeConversationIndex],
        lastMessage: action.payload,
        unreadCount: 0, // Reset unread count for sender
      };
      // remove old stale
      state.conversations.splice(activeConversationIndex, 1);
      // put in the beginning
      state.conversations.unshift(updatedConversation);
    });

    /**** MARK CONVERSATION AS READ  ****/
    builder.addCase(markConversationAsRead.pending, (state) => {
      state.status = "pending";
      state.error = "";
    });

    builder.addCase(markConversationAsRead.rejected, (state, action) => {
      state.status = "error";
      if (action.payload) {
        state.error = action.payload.error.message;
      } else {
        state.error = action.error.message || "Unknown error";
      }
    });

    builder.addCase(markConversationAsRead.fulfilled, (state, action) => {
      state.status = "success";
      state.error = "";

      const conversationId = action.meta.arg;
      const conversation = state.conversations.find(
        (c) => c._id === conversationId
      );

      if (conversation) {
        conversation.unreadCount = 0;
      }
    });
  },
});

export const {
  addConversation,
  setActiveConversation,
  updateMessages,
  updateConversationLastMessage,
  setOnlineUsers,
  updateUnreadCount,
} = chatSlice.actions;

export const conversationsSelector = (state: RootState) =>
  state.chat.conversations;

export default chatSlice.reducer;
