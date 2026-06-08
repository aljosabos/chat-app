import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { openConversation } from "@features/chat/thunks";
import type { Conversation as ConversationType } from "@features/chat/types";
import { cn } from "@utils/cn";
import { socket } from "@utils/socket";
import { useCallback, useRef, useState } from "react";
import { getLastMessage, getLastMessageDate } from "./Conversation.helpers";
import { DotsIcon } from "@icons/Dots";
import { ConversationMenu } from "./ConversationMenu/ConversationMenu";
import { useClickOutside } from "@/hooks/useOutsideClick";

interface ConversationProps {
  conversation: ConversationType;
  isActive: boolean;
  onOpenChat: () => void;
  onDeleteConversation: (conversationId: string) => void;
}
export const Conversation = ({
  conversation,
  isActive,
  onOpenChat,
  onDeleteConversation,
}: ConversationProps) => {
  const dispatch = useAppDispatch();
  const { lastMessage } = conversation;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { user: currentUser } = useAppSelector((state) => state.user);
  const { onlineUsers } = useAppSelector((state) => state.chat);

  // users contains both user IDs from the same conversation; receiver is the one that is not the current user
  const receiver = conversation.users.find(
    (user) => user._id !== currentUser._id,
  );

  // checks whether the receiver is online
  const isOnline = onlineUsers.some((u) => u.userId === receiver?._id);

  const handleOpenConversation = useCallback(async () => {
    if (!receiver?._id) return;

    try {
      const conversation = await dispatch(
        openConversation(receiver._id),
      ).unwrap();

      socket.emit("join conversation", conversation._id);
    } catch (err) {
      console.error(err);
    }
  }, [dispatch, receiver?._id]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  useClickOutside(menuRef, closeMenu);

  return (
    <div
      onClick={handleOpenConversation}
      className={cn(
        "group flex items-end justify-between p-3 gap-x-3 cursor-pointer border-b border-b-dark-5 mx-4 relative",
        {
          "dark:bg-dark-hover-1": isActive,
          "hover:bg-dark-3": !isActive,
        },
      )}
    >
      {/* LEFT */}
      {
        <div className="flex gap-x-3 flex-1 min-w-0" onClick={onOpenChat}>
          <img
            src={receiver?.picture}
            alt={receiver?.name}
            className={cn("w-11 h-11 rounded-full flex-shrink-0", {
              "border-2 border-[#00a884]": isOnline,
            })}
          />

          <div className="flex flex-col min-w-0 flex-1">
            <h6 className="font-bold leading-6 truncate">{receiver?.name}</h6>
            <p className="dark:text-dark-text-2 text-sm truncate">
              {getLastMessage(lastMessage?.message)}
            </p>
          </div>
        </div>
      }

      {/* RIGHT */}
      <div className="flex text-xs flex-shrink-0">
        <span className="dark:text-dark-text-2 mb-0.5 whitespace-nowrap">
          {getLastMessageDate(lastMessage?.createdAt)}
        </span>
      </div>
      <div ref={menuRef}>
        <DotsIcon
          className="dark:fill-dark-svg-1 cursor-pointer hover:bg-dark-hover-1 rounded-3xl py-0.5 absolute right-1 top-2 
  opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 
  transition-all duration-300 ease-out"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu((prev) => !prev);
          }}
        />
        {showMenu && (
          <ConversationMenu
            onDeleteConversation={() => onDeleteConversation(conversation._id)}
          />
        )}
      </div>
    </div>
  );
};
