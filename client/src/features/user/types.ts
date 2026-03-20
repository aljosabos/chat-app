export interface UserState {
  authStatus: "idle" | "pending" | "success" | "error";
  error: string;
  user: User;
}

export interface RegisterUserResonse {
  message: string;
  user: User;
}

export type User = {
  _id: string;
  name: string;
  email: string;
  picture: string;
  status: string;
  accessToken: string;
};
