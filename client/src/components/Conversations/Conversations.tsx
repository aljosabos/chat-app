import { Conversation } from "@components/Conversation/Conversation";
import type { Conversation as ConversationType } from "@features/chat/types";

interface ConversationsProps {
  conversations: ConversationType[];
  activeConversationId: string;
}
export const Conversations = ({
  conversations,
  activeConversationId,
}: ConversationsProps) => {
  return (
    <div className="h-full overflow-y-auto scrollbar text-white">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          isActive={conversation._id === activeConversationId}
        />
      ))}
    </div>
  );
};
