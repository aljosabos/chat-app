import type { RootState } from "@/store";
import type { ApiError } from "@/types";
import type { LoginFormValues } from "@components/LoginForm/LoginForm.schema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  authStatus: "idle" | "pending" | "success" | "error";
  error: string;
  user: {
    _id: string;
    name: string;
    email: string;
    picture: string;
    status: string;
    accessToken: string;
  };
}

interface RegisterUserResonse {
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    picture: string;
    status: string;
    accessToken: string;
  };
}

// Define the initial state using that type
const initialState: UserState = {
  authStatus: "idle",
  error: "",
  user: {
    _id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    accessToken: "",
  },
};

// thunks
export const registerUser = createAsyncThunk<
  RegisterUserResonse,
  FormData,
  { rejectValue: { error: ApiError } }
>("auth/register", async (formData, { rejectWithValue }) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/v1/auth/register`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
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

export const loginUser = createAsyncThunk<
  RegisterUserResonse,
  LoginFormValues,
  { rejectValue: { error: ApiError } }
>("auth/login", async (fields, { rejectWithValue }) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/v1/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ ...fields }),
      headers: {
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
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.authStatus = "idle";
      state.error = "";
      state.user = initialState.user;
    },

    resetUserError: (state) => {
      state.error = "";
      state.authStatus = "idle";
    },
  },

  extraReducers: (builder) => {
    // REGISTER
    builder.addCase(registerUser.pending, (state) => {
      state.authStatus = "pending";
      state.error = "";
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.authStatus = "error";
      if (action.payload) {
        state.error = action.payload.error.message;
      } else {
        state.error = action.error.message || "Unknown error";
      }
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.authStatus = "success";
      state.error = "";
      state.user = action.payload?.user ?? initialState.user;
    });

    // LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.authStatus = "pending";
      state.error = "";
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.authStatus = "error";
      if (action.payload) {
        state.error = action.payload.error.message;
      } else {
        state.error = action.error.message || "Unknown error";
      }
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.authStatus = "success";
      state.error = "";
      state.user = action.payload?.user ?? initialState.user;
    });
  },
});

export const { logout, resetUserError } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
