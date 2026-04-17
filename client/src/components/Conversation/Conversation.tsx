import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { openConversation } from "@features/chat/thunks";
import type { Conversation as ConversationType } from "@features/chat/types";
import { cn } from "@utils/cn";
import { formatDate } from "@utils/date";
import { useCallback } from "react";

interface ConversationProps {
  conversation: ConversationType;
  isActive: boolean;
}
export const Conversation = ({ conversation, isActive }: ConversationProps) => {
  const dispatch = useAppDispatch();
  const { picture, name, lastMessage } = conversation;

  const { user: currentUser } = useAppSelector((state) => state.user);

  // in array 'users: ['id1', 'id2']' which contains both user's ids inside conversation, the receiver is the one who is not the current user
  const receiver = conversation.users.find(
    (user) => user._id !== currentUser._id
  );

  const handleOpenConversation = useCallback(async () => {
    if (!receiver?._id) return;

    try {
      await dispatch(openConversation(receiver._id)).unwrap();
    } catch (err) {
      console.error(err);
    }
  }, [dispatch, receiver?._id]);

  //hover:bg-dark-3

  return (
    <div
      onClick={handleOpenConversation}
      className={cn(
        "flex items-end justify-between p-3 gap-x-3 cursor-pointer border-b border-b-dark-5 mx-4",
        {
          "dark:bg-dark-hover-1": isActive,
          "hover:bg-dark-3": !isActive,
        }
      )}
    >
      {/* LEFT */}
      <div className="flex gap-x-3 flex-1 min-w-0">
        <img
          src={picture}
          alt={name}
          className="w-11 h-11 rounded-full flex-shrink-0"
        />

        <div className="flex flex-col min-w-0 flex-1">
          <h6 className="font-bold leading-6 truncate">{conversation.name}</h6>

          <p className="dark:text-dark-text-2 text-sm truncate">
            {lastMessage?.message.length > 25
              ? `${lastMessage?.message.substring(0, 25)}`
              : lastMessage.message}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex text-xs flex-shrink-0">
        <span className="dark:text-dark-text-2 mb-0.5 whitespace-nowrap">
          {lastMessage.createdAt ? formatDate(lastMessage.createdAt) : ""}
        </span>
      </div>
    </div>
  );
};
