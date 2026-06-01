import type { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "./types";
import { registerUser, loginUser } from "./thunks";

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

    updateAccessToken: (state, action) => {
      state.user.accessToken = action.payload;
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
