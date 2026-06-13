import { useState } from "react";
import { ChatComposer } from "./ChatComposer/ChatComposer";
import { ChatHeader } from "./ChatHeader/ChatHeader";
import { ChatMessages } from "./ChatMessages/ChatMessages";
import type { Message } from "@features/chat/types";

interface ChatViewProps {
  onBack?: () => void;
}

export const ChatView = ({ onBack }: ChatViewProps) => {
  const [messageForEdit, setMessageForEdit] = useState<Message | null>(null);

  return (
    <div className="flex flex-col w-full h-full">
      <ChatHeader onBack={onBack} />
      <ChatMessages setMessageForEdit={setMessageForEdit} />
      <ChatComposer
        messageForEdit={messageForEdit}
        setMessageForEdit={setMessageForEdit}
      />
    </div>
  );
};
