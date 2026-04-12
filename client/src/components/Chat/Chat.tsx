import { ChatHeader } from "./ChatHeader/ChatHeader";

export const Chat = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <ChatHeader />
      <div className="dark:bg-dark-1 h-full"></div>
    </div>
  );
};
