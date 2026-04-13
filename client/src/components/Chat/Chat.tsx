import { ChatHeader } from "./ChatHeader/ChatHeader";
import { ChatMessages } from "./ChatMessages/ChatMessages";

export const Chat = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <ChatHeader />
      <ChatMessages />
    </div>
  );
};
