import type { Conversation as ConversationType } from "@features/chat/types";

interface ConversationProps {
  conversation: ConversationType;
}
export const Conversation = ({ conversation }: ConversationProps) => {
  return (
    <div className="flex items-center p-3 gap-x-3">
      <img
        src={conversation.picture}
        alt={conversation.name}
        className="w-11 h-11 rounded-full "
      />
      <div className="flex flex-col">
        <h6 className="font-bold leading-5">{conversation.name}</h6>
        <p className="dark:text-dark-text-2">
          {conversation.lastMessage.message}
        </p>
      </div>
    </div>
  );
};
