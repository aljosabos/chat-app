import { getErrorMessage } from "@utils/error";

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  // remove leading slash if accidentally passed
  const parsedUrl = url.startsWith("/") ? url.slice(1) : url;

  const isFormData = options.body instanceof FormData;

  try {
    const headers = new Headers(options.headers);

    // Only set JSON header if NOT FormData and not already set
    if (!isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    // Prepare body
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

    let data = null;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.error.message || "Request failed",
      };
    }

    return data;
  } catch (err) {
    throw {
      status: 0,
      message: getErrorMessage(err),
      original: err,
    };
  }
};
