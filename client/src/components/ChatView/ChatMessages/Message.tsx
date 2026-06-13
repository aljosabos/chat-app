import { formatDate } from "@utils/date";
import { useState, useRef } from "react";
import { DotsIcon } from "@icons/Dots";
import { MessageMenu } from "@components/ChatView/ChatMessages/MessageMenu/MessageMenu";
import { useClickOutside } from "@/hooks/useOutsideClick";

interface IMessageProps {
  message: string;
  createdAt: string;
  orientation?: "left" | "right";
  messageId?: string;
  isOwnMessage?: boolean;
  onDeleteMessage?: (messageId: string) => void;
  onEditMessage: () => void;
}

export const Message = ({
  message,
  createdAt,
  orientation = "right",
  messageId,
  isOwnMessage = false,
  onDeleteMessage,
  onEditMessage,
}: IMessageProps) => {
  const isLeft = orientation === "left";
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => {
    setShowMenu(false);
  };

  useClickOutside(menuRef, closeMenu);

  const handleDelete = () => {
    if (onDeleteMessage && messageId) {
      onDeleteMessage(messageId);
    }
    closeMenu();
  };

  const handleEdit = () => {
    onEditMessage();
    closeMenu();
  };

  // Only show the menu for own messages
  if (!isOwnMessage) {
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
  }

  return (
    <div
      className={`flex my-4 ${isLeft ? "justify-start" : "justify-end"} group relative`}
    >
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
      <div ref={menuRef}>
        <DotsIcon
          className="dark:fill-dark-svg-1 cursor-pointer hover:bg-dark-hover-1 rounded-3xl py-0.5 absolute right-0 top-0
    opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
    transition-all duration-300 ease-out"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu((prev) => !prev);
          }}
        />
        {showMenu && (
          <MessageMenu
            onDeleteMessage={handleDelete}
            onEditMessage={handleEdit}
          />
        )}
      </div>
    </div>
  );
};
