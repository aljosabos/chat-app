export const getErrorMessage = (err: unknown): string => {
  if (typeof err === "object" && err !== null) {
    if ("error" in err && typeof err.error === "object" && err.error !== null) {
      if ("message" in err.error && typeof err.error.message === "string") {
        return err.error.message;
      }
    }

    if ("message" in err && typeof err.message === "string") {
      return err.message;
    }
  }

  return "Network error";
};
