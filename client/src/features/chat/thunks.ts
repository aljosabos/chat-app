import type { RootState } from "@/store";
import type { ApiError } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ConversationsResponse, Conversation, Message } from "./types";
import { apiFetch } from "@utils/api";
import { isApiError } from "@/helpers";

// get all conversations of current user
export const getConversations = createAsyncThunk<
  ConversationsResponse,
  void,
  { rejectValue: { error: ApiError }; state: RootState }
>("conversations/get", async (_, { rejectWithValue }) => {
  try {
    const data = await apiFetch("conversation");

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
>("conversations/create", async (receiver_id, { rejectWithValue }) => {
  try {
    const data = await apiFetch("conversation", {
      method: "POST",
      body: JSON.stringify({ receiver_id }),
    });

    return data;
  } catch (err) {
    const error = isApiError(err)
      ? err
      : { status: 500, message: "Network error" };

    return rejectWithValue({ error });
  }
});

// get all messages from the specific user (conversation)
export const getConversationMessages = createAsyncThunk<
  Message[],
  string,
  { rejectValue: { error: ApiError }; state: RootState }
>("messages/get", async (conversationId, { rejectWithValue }) => {
  try {
    const url = `message/${conversationId}`;

    const data = await apiFetch(url);

    return data;
  } catch (err) {
    const error = isApiError(err)
      ? err
      : { status: 500, message: "Network error" };

    return rejectWithValue({ error });
  }
});

// send message to a user
export const sendMessage = createAsyncThunk<
  Message,
  { conversationId: string; message: string; files?: File[] },
  { rejectValue: { error: ApiError }; state: RootState }
>("messages/send", async (values, { rejectWithValue }) => {
  try {
    const hasFiles = values.files && values.files.length > 0;

    const body = hasFiles
      ? (() => {
          const formData = new FormData();

          formData.append("conversationId", values.conversationId);
          formData.append("message", values.message);

          values.files!.forEach((file) => {
            formData.append("files", file);
          });

          return formData;
        })()
      : JSON.stringify({
          conversationId: values.conversationId,
          message: values.message,
        });

    const data = await apiFetch("message", {
      method: "POST",
      body,
    });

    return data;
  } catch (err) {
    const error = isApiError(err)
      ? err
      : { status: 500, message: "Network error" };

    return rejectWithValue({ error });
  }
});
