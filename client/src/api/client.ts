import { store } from "@/store";

export const authFetch = async (url: string, options: RequestInit = {}) => {
  const state = store.getState();
  const token = state.user.user.accessToken;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};
