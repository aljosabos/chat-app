import { getErrorMessage } from "@utils/error";
import { ApiError } from "@utils/apiError";
import { store } from "@store";
import { refreshTokenOrLogout } from "@utils/auth";

// Added to avoid multiple simultaneous refresh token requests
let activeRefreshTokenRequest: Promise<boolean> | null = null;

/**
 * Fetches data from the API endpoint.
 * @param url The API endpoint URL.
 * @param options The request options.
 * @returns A promise resolving to the fetched data or rejecting with an error.
 */
export const apiFetch = async (url: string, options: RequestInit = {}) => {
  try {
    let response = await makeRequest(url, options);

    // Try to refresh token if unauthorized
    if (response.status === 401) {
      if (!activeRefreshTokenRequest) {
        activeRefreshTokenRequest = refreshTokenOrLogout().finally(() => {
          activeRefreshTokenRequest = null;
        });
      }

      const refreshed = await activeRefreshTokenRequest;

      if (!refreshed) {
        throw new ApiError("Unauthorized", 401);
      }

      // Retry original request after refreshing token
      response = await makeRequest(url, options);
    }

    let data = null;

    // try to stringify response data (if not form-data)
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new ApiError(
        data?.error?.message || data?.message || "Request failed",
        response.status,
      );
    }

    return data;
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }

    throw new ApiError(getErrorMessage(err), 0);
  }
};

/**
 * Makes a request to the API endpoint.
 * @param url The API endpoint URL.
 * @param options The request options.
 * @returns A promise resolving to the fetch response.
 */
const makeRequest = async (url: string, options: RequestInit = {}) => {
  // remove leading slash if present to avoid issues with base URL
  const parsedUrl = url.startsWith("/") ? url.slice(1) : url;

  const isFormData = options.body instanceof FormData;
  const headers = new Headers(options.headers);

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Attach access token if available
  const token = store.getState().user.user.accessToken;

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const body =
    isFormData || typeof options.body === "string"
      ? options.body
      : options.body
        ? JSON.stringify(options.body)
        : undefined;

  return fetch(`/api/v1/${parsedUrl}`, {
    ...options,
    headers,
    body,
    credentials: "include",
  });
};
