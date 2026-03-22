import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type ConversationsResponse } from "./types";
import type { ApiError } from "@/types";
import type { ChatState, Conversation } from "./types";

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
  },
});

// thunks
import type { RootState } from "@/store";

export const getConversations = createAsyncThunk<
  ConversationsResponse,
  void,
  { rejectValue: { error: ApiError }; state: RootState }
>("conversations/get", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const token = state.user.user.accessToken;

    const url = `${import.meta.env.VITE_API_URL}/api/v1/conversation`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }

    const data = await response.json();

    return data;
  } catch {
    return rejectWithValue({
      error: { status: 500, message: "Network error" },
    });
  }
});

export const { setActiveConversation } = chatSlice.actions;

export const conversationsSelector = (state: RootState) =>
  state.chat.conversations;

export default chatSlice.reducer;
