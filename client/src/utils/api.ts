import { getErrorMessage } from "@utils/error";

export const apiFetch = async (url: string, options?: RequestInit) => {
  //remove backslash from url parameter if passed accidentally
  const parsedUrl = url.startsWith("/") ? url.slice(1) : url;
  
  const isFormData = options?.body instanceof FormData;

  try {
    const response = await fetch(`/api/v1/${parsedUrl}`, {
      ...options,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
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
