import type { ApiError } from "./types";

export const isApiError = (err: unknown): err is ApiError => {
  return (
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    "message" in err
  );
};
