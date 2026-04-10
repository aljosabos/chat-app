import type { RootState } from "@/store";
import type { ApiError } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ConversationsResponse, Conversation } from "./types";

// get all conversations of current user
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

// create or open conversation with a specific user
export const openConversation = createAsyncThunk<
  Conversation,
  string,
  { rejectValue: { error: ApiError }; state: RootState }
>(
  "conversations/create",
  async (receiver_id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.user.accessToken;

      const url = `${import.meta.env.VITE_API_URL}/api/v1/conversation`;

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ receiver_id }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
  }
);
