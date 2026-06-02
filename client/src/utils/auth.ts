import { store } from "@/store";
import { updateAccessToken, logout } from "@features/user/userSlice";

/**
 * Refreshes the access token or logs out the user if the refresh fails.
 * @returns A promise resolving to true if the token was refreshed, false otherwise.
 */
export const refreshTokenOrLogout = async () => {
  try {
    const refreshResponse = await fetch("/api/v1/auth/refreshToken", {
      method: "POST",
      credentials: "include",
    });

    if (!refreshResponse.ok) {
      store.dispatch(logout());
      window.location.href = "/login";
      return false;
    }

    const data = await refreshResponse.json();

    store.dispatch(updateAccessToken(data.accessToken));
    return true;
  } catch {
    store.dispatch(logout());
    window.location.href = "/login";
    return false;
  }
};
