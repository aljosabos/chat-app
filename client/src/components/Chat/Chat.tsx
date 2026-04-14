import { ChatComposer } from "./ChatComposer/ChatComposer";
import { ChatHeader } from "./ChatHeader/ChatHeader";
import { ChatMessages } from "./ChatMessages/ChatMessages";

export const Chat = () => {
  return (
    <div className="flex flex-col w-full">
      <ChatHeader />
      <ChatMessages />
      <ChatComposer />
    </div>
  );
};
