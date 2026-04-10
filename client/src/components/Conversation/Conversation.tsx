import type { Conversation as ConversationType } from "@features/chat/types";
import { formatDate } from "@utils/date";

interface ConversationProps {
  conversation: ConversationType;
}
export const Conversation = ({ conversation }: ConversationProps) => {
  return (
    <div className="flex items-end justify-between p-3 gap-x-3 hover:bg-dark-3 cursor-pointer border-b border-b-dark-5 mx-4">
      {/* LEFT */}
      <div className="flex gap-x-3 flex-1 min-w-0">
        <img
          src={conversation.picture}
          alt={conversation.name}
          className="w-11 h-11 rounded-full flex-shrink-0"
        />

        <div className="flex flex-col min-w-0 flex-1">
          <h6 className="font-bold leading-6 truncate">{conversation.name}</h6>

          <p className="dark:text-dark-text-2 text-sm truncate">
            {conversation.lastMessage?.message}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex text-xs flex-shrink-0">
        <span className="dark:text-dark-text-2 mb-0.5 whitespace-nowrap">
          {formatDate(conversation.lastMessage.createdAt)}
        </span>
      </div>
    </div>
  );
};
