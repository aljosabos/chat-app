import dayjs from "dayjs";

export const formatDate = (date: string) => {
  const time = dayjs(date);
  const now = dayjs();

  if (now.isSame(time, "day")) {
    return time.format("HH:mm");
  }

  if (now.subtract(1, "day").isSame(time, "day")) {
    return `Yesterday ${time.format("HH:mm")}`;
  }

  return time.format("DD.MM.YY");
};
