import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RegisterUserResonse } from "./types";
import type { ApiError } from "@/types";
import type { LoginFormValues } from "@components/LoginForm/LoginForm.schema";
import { apiFetch } from "@utils/api";
import { isApiError } from "@/helpers";

export const registerUser = createAsyncThunk<
  RegisterUserResonse,
  FormData,
  { rejectValue: { error: ApiError } }
>("auth/register", async (formData, { rejectWithValue }) => {
  try {
    const data = await apiFetch("auth/register", {
      method: "POST",
      body: formData,
    });

    return data;
  } catch (err) {
    const error = isApiError(err)
      ? err
      : { status: 500, message: "Network error" };

    return rejectWithValue({ error });
  }
});

export const loginUser = createAsyncThunk<
  RegisterUserResonse,
  LoginFormValues,
  { rejectValue: { error: ApiError } }
>("auth/login", async (fields, { rejectWithValue }) => {
  try {
    const data = await apiFetch("auth/login", {
      method: "POST",
      body: JSON.stringify({ ...fields }),
    });

    return data;
  } catch (err) {
    const error = isApiError(err)
      ? err
      : { status: 500, message: "Network error" };

    return rejectWithValue({ error });
  }
});
