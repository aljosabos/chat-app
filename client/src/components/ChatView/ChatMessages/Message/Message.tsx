import { formatDate } from "@utils/date";
import { useState, useRef } from "react";
import { DotsIcon } from "@icons/Dots";
import { MessageMenu } from "@components/ChatView/ChatMessages/MessageMenu/MessageMenu";
import { useClickOutside } from "@/hooks/useOutsideClick";
import { MessageFile } from "./MessageFile";
import type { FileType } from "@features/chat/types";

interface IMessageProps {
  message: string;
  files: FileType[];
  createdAt: string;
  orientation?: "left" | "right";
  messageId?: string;
  isOwnMessage?: boolean;
  onDeleteMessage?: (messageId: string) => void;
  onEditMessage: () => void;
}

export const Message = ({
  message,
  files,
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

  useClickOutside(menuRef, () => setShowMenu(false));

  const handleDelete = () => {
    if (onDeleteMessage && messageId) {
      onDeleteMessage(messageId);
    }
    setShowMenu(false);
  };

  const handleEdit = () => {
    onEditMessage();
    setShowMenu(false);
  };

  const MessageContent = () => (
    <>
      {files?.length > 0 &&
        files.map((file) => <MessageFile key={file.url} file={file} />)}

      {message && <p className="mt-1">{message}</p>}

      <p className="text-xs w-min ml-auto text-dark-text-5 mt-1">
        {formatDate(createdAt)}
      </p>
    </>
  );

  const contentClass = `relative text-white px-3 py-2 rounded-lg max-w-xs ${
    isLeft ? "bg-dark-2 bubble-left" : "bg-green-3"
  }`;

  const wrapperClass = `flex my-4 ${
    isLeft ? "justify-start" : "justify-end"
  } group relative`;

  return (
    <div className={wrapperClass}>
      <div className={contentClass}>
        <MessageContent />
      </div>

      {isOwnMessage && (
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
      )}
    </div>
  );
};
