// api/userApi.ts

import { type User } from "@/features/user/types";
import { authFetch } from "./client";

type ApiError = {
  status: number;
  message: string;
};

export const searchUser = async (search: string): Promise<User[]> => {
  const url = `${
    import.meta.env.VITE_API_URL
  }/api/v1/user?search=${encodeURIComponent(search)}`;

  const response = await authFetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData as { error: ApiError };
  }

  return response.json();
};
