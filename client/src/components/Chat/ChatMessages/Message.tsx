import { formatDate } from "@utils/date";

interface IMessageProps {
  message: string;
  createdAt: string;
  orientation?: "left" | "right";
}

export const Message = ({
  message,
  createdAt,
  orientation = "right",
}: IMessageProps) => {
  const isLeft = orientation === "left";

  return (
    <div className={`flex my-4 ${isLeft ? "justify-start" : "justify-end"}`}>
      <div
        className={`relative text-white ${
          isLeft ? "bg-dark-2" : "bg-green-3"
        } px-3 py-2 rounded-lg max-w-xs ${isLeft ? "bubble-left" : ""}`}
      >
        {message}

        <p className="text-xs w-min ml-auto text-dark-text-5">
          {formatDate(createdAt)}
        </p>
      </div>
    </div>
  );
};
