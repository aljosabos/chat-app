import { type User } from "@/features/user/types";
import { apiFetch } from "@utils/api";
import { store } from "@/store";
import { isApiError } from "@/helpers";

// api for user search outside the redux flow
export const searchUser = async (search: string): Promise<User[]> => {
  const state = store.getState();
  const token = state.user.user.accessToken;

  const url = `user?search=${encodeURIComponent(search)}`;

  try {
    const data = await apiFetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    throw isApiError(err) ? err : { status: 500, message: "Network error" };
  }
};
