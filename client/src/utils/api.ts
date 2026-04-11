import { getErrorMessage } from "@utils/error";

export const apiFetch = async (url: string, options?: RequestInit) => {
  const parsedUrl = url.startsWith("/") ? url.slice(1) : url;

  try {
    const response = await fetch(`/api/v1/${parsedUrl}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    let data;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.message || "Request failed",
      };
    }

    return data;
  } catch (err) {
    throw {
      status: 0,
      message: getErrorMessage(err),
    };
  }
};
