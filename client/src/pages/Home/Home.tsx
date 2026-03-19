import {
  ChatSearch,
  MessageInput,
  NotificationsToggle,
} from "@components/index";

export const Home = () => {
  return (
    <div className=" h-screen dark:bg-dark-1">
      <div className="w-[500px]">
        <MessageInput />
        <NotificationsToggle />
        <ChatSearch />
      </div>
    </div>
  );
};
