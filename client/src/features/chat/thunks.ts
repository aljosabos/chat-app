import type { RootState } from "@/store";
import type { ApiError } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ConversationsResponse, Conversation } from "./types";
import { apiFetch } from "@utils/api";
import { isApiError } from "@/helpers";

// get all conversations of current user
export const getConversations = createAsyncThunk<
  ConversationsResponse,
  void,
  { rejectValue: { error: ApiError }; state: RootState }
>("conversations/get", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const token = state.user.user.accessToken;

    const data = await apiFetch("conversation", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    const error = isApiError(err)
      ? err
      : { status: 500, message: "Network error" };

    return rejectWithValue({ error });
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

      const data = await apiFetch("conversation", {
        method: "POST",
        body: JSON.stringify({ receiver_id }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (err) {
      const error = isApiError(err)
        ? err
        : { status: 500, message: "Network error" };

      return rejectWithValue({ error });
    }
  }
);
