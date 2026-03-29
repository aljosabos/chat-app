import type { Conversation as ConversationType } from "@features/chat/types";
import { formatDate } from "@utils/date";

interface ConversationProps {
  conversation: ConversationType;
}
export const Conversation = ({ conversation }: ConversationProps) => {
  return (
    <div className="flex items-end justify-between p-3 gap-x-3 hover:bg-dark-3 cursor-pointer">
      <div className="flex gap-x-3">
        <img
          src={conversation.picture}
          alt={conversation.name}
          className="w-11 h-11 rounded-full"
        />
        <div className="flex flex-col">
          <h6 className="font-bold leading-5">{conversation.name}</h6>
          <p className="dark:text-dark-text-2">
            {conversation.lastMessage?.message}
          </p>
        </div>
      </div>
      <div className="flex text-xs">
        <span className="dark:text-dark-text-2 mb-1">
          {formatDate(conversation.lastMessage.createdAt)}
        </span>
      </div>
    </div>
  );
};
