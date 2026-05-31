import { getErrorMessage } from "@utils/error";
import { ApiError } from "./apiError";

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const parsedUrl = url.startsWith("/") ? url.slice(1) : url;

  const isFormData = options.body instanceof FormData;

  try {
    const headers = new Headers(options.headers);

    // JSON header samo ako nije FormData
    if (!isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const body =
      isFormData || typeof options.body === "string"
        ? options.body
        : options.body
          ? JSON.stringify(options.body)
          : undefined;

    const response = await fetch(`/api/v1/${parsedUrl}`, {
      ...options,
      headers,
      body,
    });

    // pokušaj parse JSON-a
    let data = null;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    // HTTP error handling
    if (!response.ok) {
      throw new ApiError(
        data?.error?.message || data?.message || "Request failed",
        response.status,
      );
    }

    return data;
  } catch (err) {
    // network / runtime errors
    if (err instanceof ApiError) {
      throw err;
    }

    throw new ApiError(getErrorMessage(err), 0);
  }
};
