import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  status: string;
  error: string;
  user: {
    id: string;
    name: string;
    email: string;
    picture: string;
    status: string;
    token: string;
  };
}

// Define the initial state using that type
const initialState: UserState = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "Aljosa",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};

// 'auth/register' 

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = initialState.user;
    },
  },
});

export const { logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userSelector = (state: UserState) => state.user;

export default userSlice.reducer;
