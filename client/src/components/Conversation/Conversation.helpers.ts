import { formatDate } from "@utils/date";

export const getLastMessage = (message?: string) => {
  if (!message) return "";

  return message.length > 25 ? message.substring(0, 25) : message;
};

export const getLastMessageDate = (date: string) => {
  if (!date) return "";

  return formatDate(date);
};
