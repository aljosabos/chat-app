import { ChatComposer } from "./ChatComposer/ChatComposer";
import { ChatHeader } from "./ChatHeader/ChatHeader";
import { ChatMessages } from "./ChatMessages/ChatMessages";

interface ChatViewProps {
  onBack?: () => void;
}

export const ChatView = ({ onBack }: ChatViewProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      <ChatHeader onBack={onBack} />
      <ChatMessages />
      <ChatComposer />
    </div>
  );
};
